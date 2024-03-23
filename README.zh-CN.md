# 翻译多个 Markdown 操作

## 自述文件翻译

-   [英语](README.md)
-   [简体中文](README.zh-CN.md)
-   [繁体中文](README.zh-TW.md)
-   [印地语](README.hi.md)
-   [法语](README.fr.md)
-   [阿拉伯](README.ar.md)

**GitHub Action 将 README 翻译成任何语言**

这是一个 GitHub Action，可自动将存储库中的自述文件翻译为指定语言。

## 设置

**添加工作流程文件**到您的项目（例如`.github/workflows/readme.yml`):

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
        uses: ikhsan3adi/translate-multiple-markdown@v1
        with:
          LANG: zh-CN
          FILES: |-
            README.md
            OTHER-README.md
            sub/dir/README.md
            very/deep/sub/directories/FOO.md
            /very/deep/sub/directories/BAR.md

      - name: Adding README - Chinese Traditional
        uses: ikhsan3adi/translate-multiple-markdown@v1
        with:
          LANG: zh-TW
          FILES: |-
            README.md
            OTHER-README.md
            ...
```

## 叉

：警告：不要忘记运行`npm run build`在提交之前

## 配置

### 选项

您可以使用以下选项进一步配置操作：

-   `LANG`：您要将自述文件翻译成的语言。默认为简体中文。可以在下面找到支持的语言。
    （默认：`zh-CN`） （必需的：`false`)

-   `FILES`：要翻译成的 Markdown 文件的换行分隔列表。 （默认：`[README.md]`） （必需的：`false`)

## 支持的语言

可以在此处找到支持的语言[HTTPS://cloud.Google.com/translate/docs/languages](https://cloud.google.com/translate/docs/languages)

### 发展

随时欢迎提出建议和贡献！

### 执照

[和](./LICENSE)
