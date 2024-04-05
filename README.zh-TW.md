# 翻譯多個 Markdown 操作

## 自述文件翻譯

-   [英語](README.md)
-   [簡體中文](README.zh-CN.md)
-   [繁體中文](README.zh-TW.md)
-   [印尼](README.id.md)
-   [印地語](README.hi.md)
-   [法語](README.fr.md)
-   [阿拉伯](README.ar.md)

**GitHub Action 將 MARKDOWN/README 翻譯成任何語言**

將 MARKDOWN 文件翻譯為各種其他語言，支援多個文件和子目錄。

## 設定

**新增工作流程文件**到您的專案（例如`.github/workflows/translate-readme.yml`):

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

## 叉

：警告：不要忘記運行`npm run build`在提交之前

## 配置

### 選項

您可以使用以下選項進一步配置操作：

-   `LANG`：您要將自述文件翻譯成的語言。預設為簡體中文。可以在下面找到支援的語言。
    (預設:`zh-CN`） （必需的：`false`)

-   `FILES`：要翻譯成的 Markdown 檔案的換行分隔清單。 (預設:`[README.md]`） （必需的：`false`)

## 支援的語言

可以在此處找到支援的語言<https://cloud.google.com/translate/docs/languages>

### 發展

隨時歡迎提出建議和貢獻！

### 執照

[和](./LICENSE)
