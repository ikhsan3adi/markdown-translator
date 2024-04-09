# Tumindak Penerjemah Markdown

## Terjemahan README

-   [Inggris](README.md)
-   [Cina Sederhana](README.zh-CN.md)
-   [tradisional Cina](README.zh-TW.md)
-   [basa Indonesia](README.id.md)
-   [Hindi](README.hi.md)
-   [Prancis](README.fr.md)
-   [Arab](README.ar.md)

**Tindakan GitHub kanggo nerjemahake MARKDOWN/READMEs menyang basa apa wae**

Terjemahake file MARKDOWN menyang macem-macem basa liyane, ndhukung macem-macem file lan subdirektori.

## Setup

**Tambah file alur kerja**menyang proyek sampeyan (contone.`.github/workflows/translate-readme.yml`):

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

## garpu

:warning: Ojo lali mlayu`npm run build`sadurunge nindakake

## Konfigurasi

### Pilihan

Sampeyan bisa ngatur tumindak luwih kanthi pilihan ing ngisor iki:

-   `LANG`: Basa sing sampeyan pengin nerjemahake readme sampeyan. Standar kasebut yaiku Cina Sederhana. Basa sing didhukung bisa ditemokake ing ngisor iki.
    (standar:`zh-CN`) (dibutuhake:`false`)

-   `FILES`: Dhaptar file markdown sing dipisahake karo baris anyar sing pengin diterjemahake. (standar:`[README.md]`) (dibutuhake:`false`)

## Basa sing Didhukung

Basa sing didhukung bisa ditemokake ing kene<https://cloud.google.com/translate/docs/languages>

### Pangembangan

Saran lan kontribusi tansah ditampa!

### LISENSI

[KARO](./LICENSE)
