import { getInput } from "@actions/core";
import translate from "@tomsun28/google-translate-api";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import parse from "remark-parse";
import stringify from "remark-stringify";
import simpleGit from "simple-git";
import unified from "unified";
import visit from "unist-util-visit";

const mainDir = ".";

async function translateMarkdowns(lang, files) {
  for (const file of files) {
    const { mdAST, textNodes } = createTextNodes(file);

    await Promise.all(textNodes.map((node) => {
      return (async () => node.value = (await translate(node.value, { to: lang })).text)();
    }))

    const markdown = unified().use(stringify).stringify(mdAST)
    const filename = file.split(".")
    filename.splice(filename.length - 1, 0, lang)

    writeToFile(filename.join("."), markdown);
  }
}

function createTextNodes(filename) {
  const md = readFileSync(join(mainDir, filename), { encoding: "utf8" });
  const mdAST = unified().use(parse).parse(md);

  const textNodes = [];

  visit(mdAST, async (node) => {
    if (node.type === "text") textNodes.push(node);
  });

  return { mdAST, textNodes }
}

function writeToFile(filename, markdown) {
  writeFileSync(
    join(mainDir, filename),
    markdown,
    "utf8"
  );
  console.log(`${filename} written`);
}

async function commitChanges() {
  const git = simpleGit();
  await git.pull();
  console.log("commit started");
  await git.add("./*");
  await git.addConfig("user.name", "github-actions[bot]");
  await git.addConfig(
    "user.email",
    "github-actions[bot]@users.noreply.github.com"
  );
  await git.commit(
    `docs: Added ${lang} markdown(s) translation via https://github.com/ikhsan3adi/markdown-translator`
  );
  console.log("finished commit");
  await git.push();
  console.log("pushed");
}

async function main() {
  try {
    const lang = getInput("LANG") || "zh-CN";
    const mdFiles = getInput("FILES").split(/\r|\n/) ?? ["README.md"];

    await translateMarkdowns(lang, mdFiles);
    await commitChanges();
    console.log("Done");
  } catch (error) {
    console.error(error);
  }
}

main();
