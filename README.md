# Translate Multiple Markdown Action

## README Translation
- [English](README.md)
- [简体中文](README.zh-CN.md)
- [繁体中文](README.zh-TW.md)
- [Bahasa Indonesia](README.id.md)
- [हिंदी](README.hi.md)
- [Française](README.fr.md)
- [عربى](README.ar.md)

**GitHub Action to translate MARKDOWN/READMEs to any language**

Translate MARKDOWN files to various other languages, supports multiple files and subdirectories.

## Setup

**Add a workflow file** to your project (e.g. `.github/workflows/translate-readme.yml`):

```yaml
name: Translate README

on:
  push:
    branches:
      - main
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20.x
      # ISO Language Codes: https://cloud.google.com/translate/docs/languages
      - name: Adding README - Chinese Simplified
        uses: ikhsan3adi/markdown-translator@master
        with:
          LANG: zh-CN
          FILES: |-
            README.md
            OTHER-README.md
            sub/dir/README.md
            very/deep/sub/directories/FOO.md
            /very/deep/sub/directories/BAR.md

      - name: Adding README - Chinese Traditional
        uses: ikhsan3adi/markdown-translator@master
        with:
          LANG: zh-TW
          FILES: |-
            README.md
            OTHER-README.md
            ...
```

## Fork

:warning: Don't forget to run `npm run build` before committing

## Configuration

### Options

You can configure the action further with the following options:

- `LANG`: The language you want to translate your readme to. The default is Simplified Chinese. The supported languages can be found below.
  (default: `zh-CN`) (required: `false`)

- `FILES`: Newline-separated list of the markdown files you want to translate to. (default: `[README.md]`) (required: `false`)

## Supported Languages

Languages supported can be found here https://cloud.google.com/translate/docs/languages

### Development

Suggestions and contributions are always welcome!

### LICENSE

[MIT](./LICENSE)
