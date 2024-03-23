import { getInput } from "@actions/core";
import $ from "@tomsun28/google-translate-api";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import parse from "remark-parse";
import stringify from "remark-stringify";
import simpleGit from "simple-git";
import unified from "unified";
import visit from "unist-util-visit";
const git = simpleGit();

const toAst = (markdown) => {
  return unified().use(parse).parse(markdown);
};

const toMarkdown = (ast) => {
  return unified().use(stringify).stringify(ast);
};

const mainDir = ".";
const lang = getInput("LANG") || "zh-CN";
const mdFiles = getInput("FILES").split(/\r|\n/) ?? ['README.md'];

async function translate(files) {
  for (const file of files) {
    const md = readFileSync(join(mainDir, file), { encoding: "utf8" });
    const mdAST = toAst(md);
    console.log(`${file} AST CREATED AND READ`);

    const textNodes = [];
    const promises = []

    visit(mdAST, async (node) => {
      if (node.type === "text") textNodes.push(node);
    });

    for (const node of textNodes) {
      promises.push((async () => node.value = (await $(node.value, { to: lang })).text)())
    }

    await Promise.all(promises)

    const filename = file.split(".")
    filename.pop();

    await writeToFile(filename, mdAST);
  }
}

async function writeToFile(filename, mdAST) {
  writeFileSync(
    join(mainDir, `${filename}.${lang}.md`),
    toMarkdown(mdAST),
    "utf8"
  );
  console.log(`${filename}.${lang}.md written`);
}

async function commitChanges() {
  console.log("commit started");
  await git.add("./*");
  await git.addConfig("user.name", "github-actions[bot]");
  await git.addConfig(
    "user.email",
    "41898282+github-actions[bot]@users.noreply.github.com"
  );
  await git.commit(
    `docs: Added *.${lang}.md translation via https://github.com/ikhsan3adi/translate-multiple-markdown`
  );
  console.log("finished commit");
  await git.push();
  console.log("pushed");
}

async function translateReadme() {
  try {
    await git.pull();
    await translate(mdFiles);
    await commitChanges();
    console.log("Done");
  } catch (error) {
    throw new Error(error);
  }
}

translateReadme();
