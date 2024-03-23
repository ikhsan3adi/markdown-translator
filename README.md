# Translate Readme Action

## README Translation
- [English](README.md)
- [简体中文](README.zh-CN.md)
- [繁体中文](README.zh-TW.md)
- [हिंदी](README.hi.md)
- [Française](README.fr.md)
- [عربى](README.ar.md)

**GitHub Action to translate Readme to any language**

This is a GitHub Action that automatically translate the readme in your repo to a specified language.

_A submission for the [DEV: GitHub Actions For Open Source!](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn) hackathon_

## Setup

1. **Add a workflow file** to your project (e.g. `.github/workflows/readme.yml`):
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
      # ISO Langusge Codes: https://cloud.google.com/translate/docs/languages
      - name: Adding README - Chinese Simplified
        uses: ikhsan3adi/translate-multiple-markdown@master
        with:
          LANG: zh-CN
          FILES: |-
            README.md
            OTHER-README.md
            sub/dir/README.md
            very/deep/sub/directories/FOO.md
            /very/deep/sub/directories/BAR.md

      - name: Adding README - Chinese Traditional
        uses: ikhsan3adi/translate-multiple-markdown@master
        with:
          LANG: zh-TW
          FILES: |-
            README.md
            OTHER-README.md
            ...
```

## Configuration

### Options

You can configure the action further with the following options:

- `LANG`: The language you want to translate your readme to. The default is Simplified Chinese. (I'm a Ghanaian) The supported languages can be found below.
  (default: `zh-CH`) (required: `false`)

- `FILES`: Newline-separated list of the markdown files you want to translate to. (default: `[README.md]`) (required: `true`)

## Supported Languages

Languages supported can be found here https://cloud.google.com/translate/docs/languages

### Issues

Check [here](https://github.com/dephraiim/translate-readme/issues/1) for issues related to this action.

### Development

Suggestions and contributions are always welcome!

### LICENSE

[MIT](./LICENSE)
