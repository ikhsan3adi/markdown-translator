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
const lang = getInput("LANG") || "en";
const mdFiles = getInput("FILES").split(/\r|\n/);

async function translate(files) {
  for (const file of files) {
    const readme = readFileSync(join(mainDir, file), { encoding: "utf8" });
    const readmeAST = toAst(readme);
    console.log(`${file} AST CREATED AND READ`);

    let originalText = [];

    visit(readmeAST, async (node) => {
      if (node.type === "text") {
        originalText.push(node.value);
        node.value = (await $(node.value, { to: lang })).text;
      }
    });

    const translatedText = originalText.map(async (text) => {
      return (await $(text, { to: lang })).text;
    });

    const filename = file.split(".")
    filename.pop();

    await writeToFile(filename, readmeAST, translatedText);
  }
}

async function writeToFile(filename, readmeAST, translatedText) {
  await Promise.all(translatedText);
  writeFileSync(
    join(mainDir, `${filename}.${lang}.md`),
    toMarkdown(readmeAST),
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
    `docs: Added README."${lang}".md translation via https://github.com/dephraiim/translate-readme`
  );
  console.log("finished commit");
  await git.push();
  console.log("pushed");
}

async function translateReadme() {
  try {
    await translate(mdFiles);
    await commitChanges();
    console.log("Done");
  } catch (error) {
    throw new Error(error);
  }
}

translateReadme();
