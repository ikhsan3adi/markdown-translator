import { getInput } from '@actions/core'
import translate from '@tomsun28/google-translate-api'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import simpleGit from 'simple-git'
import unified from 'unified'
import { Literal } from 'unist'
import visit from 'unist-util-visit'

const mainDir = '.'

async function translateMarkdowns(lang: string, files: string[]) {
  for (const file of files) {
    const { mdAST, textNodes } = createTextNodes(file)

    await Promise.all(
      textNodes.map(async (node) => await translate(node.value, { to: lang }).then(({ text }) => {
        node.value = text
      })),
    )

    const markdown = unified().use(stringify).stringify(mdAST)
    const filename = file.split('.')
    filename.splice(filename.length - 1, 0, lang)

    writeToFile(filename.join('.'), markdown)
  }
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
  console.log(`${filename} written`)
}

async function commitChanges(lang: string) {
  const git = simpleGit()
  await git.pull()
  console.log('commit started')
  await git.add('./*')
  await git.addConfig('user.name', 'github-actions[bot]')
  await git.addConfig(
    'user.email',
    'github-actions[bot]@users.noreply.github.com',
  )
  await git.commit(
    `docs: Added ${lang} markdown(s) translation via https://github.com/ikhsan3adi/markdown-translator`,
  )
  console.log('finished commit')
  await git.push()
  console.log('pushed')
}

async function main() {
  try {
    const lang = getInput('LANG') || 'zh-CN'
    const mdFiles = getInput('FILES').split(/\r|\n/) ?? ['README.md']

    await translateMarkdowns(lang, mdFiles)
    await commitChanges(lang)
    console.log('Done')
  } catch (error) {
    console.error(error)
    throw error
  }
}

main()
