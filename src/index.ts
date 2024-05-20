import { getInput, info, setFailed } from '@actions/core'
import translate from '@tomsun28/google-translate-api'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import simpleGit, { SimpleGit } from 'simple-git'
import unified from 'unified'
import { Literal } from 'unist'
import visit from 'unist-util-visit'

const mainDir = '.'

async function translateMarkdowns(lang: string, files: string[]) {
  const newFilenames = []
  for (const file of files) {
    const { mdAST, textNodes } = createTextNodes(file)

    await Promise.all(
      textNodes.map(
        async (node) =>
          await translate(node.value, { to: lang }).then(({ text }) => {
            node.value = text
          }),
      ),
    )

    const markdown = unified().use(stringify).stringify(mdAST)
    const filename = file.split('.')
    filename.splice(filename.length - 1, 0, lang)
    const newFilename = filename.join('.')

    writeToFile(newFilename, markdown)

    newFilenames.push(newFilename)
  }
  return newFilenames
}

function createTextNodes(filename: string) {
  const md = readFileSync(join(mainDir, filename), { encoding: 'utf8' })
  const mdAST = unified().use(parse).parse(md)

  const textNodes: Literal<string>[] = []

  visit(mdAST, (node: Literal<string>) => {
    if (node.type === 'text') textNodes.push(node)
  })

  return { mdAST, textNodes }
}

function writeToFile(
  filename: string,
  markdown: string | NodeJS.ArrayBufferView,
) {
  writeFileSync(join(mainDir, filename), markdown, 'utf8')
  info(`${filename} written`)
}

async function setupGit() {
  const git = simpleGit()
  await git.addConfig('user.name', 'github-actions[bot]')
  await git.addConfig(
    'user.email',
    'github-actions[bot]@users.noreply.github.com',
  )
  return git
}

async function commitChanges(git: SimpleGit, lang: string, files: string[]) {
  info('commit started')
  await git.commit(
    `docs: Added ${lang} translation via https://github.com/${process.env.GITHUB_ACTION_REPOSITORY}`,
    files,
  )
  info('finished commit')
}

async function pushChanges(git: SimpleGit) {
  await git.pull()
  await git.push()
  info('pushed')
}

async function main() {
  try {
    const langs = getInput('LANG').split(/\r|\n/) ?? ['zh-CN']
    const mdFiles = getInput('FILES').split(/\r|\n/) ?? ['README.md']

    if (Array.isArray(langs)) {
      const git = await setupGit()
      const translatedMDs = await Promise.all(
        langs.map(async (lang) => {
          if (!lang) return
          return { lang, files: await translateMarkdowns(lang, mdFiles) }
        }),
      )
      for (const { lang, files } of translatedMDs) {
        await commitChanges(git, lang, files)
      }
      await pushChanges(git)
    }

    info('Done')
  } catch (error) {
    setFailed(error)
  }
}

main()
