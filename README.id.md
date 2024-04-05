# Tindakan Penerjemah Penurunan Harga

## Terjemahan README

-   [Bahasa inggris](README.md)
-   [Cina disederhanakan](README.zh-CN.md)
-   [Cina tradisional](README.zh-TW.md)
-   [Bahasa Indonesia](README.id.md)
-   [Hindi](README.hi.md)
-   [Perancis](README.fr.md)
-   [Arab](README.ar.md)

**GitHub Action untuk menerjemahkan MARKDOWN/README ke bahasa apa pun**

Terjemahkan file MARKDOWN ke berbagai bahasa lain, mendukung banyak file dan subdirektori.

## Mempersiapkan

**Tambahkan file alur kerja**untuk proyek Anda (mis.`.github/workflows/translate-readme.yml`):

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

## Garpu

:peringatan: Jangan lupa lari`npm run build`sebelum melakukan

## Konfigurasi

### Pilihan

Anda dapat mengonfigurasi tindakan lebih lanjut dengan opsi berikut:

-   `LANG`: Bahasa yang Anda inginkan untuk menerjemahkan readme Anda. Standarnya adalah Bahasa Cina Sederhana. Bahasa yang didukung dapat ditemukan di bawah.
    (bawaan:`zh-CN`) (diperlukan:`false`)

-   `FILES`: Daftar file penurunan harga yang dipisahkan baris baru yang ingin Anda terjemahkan. (bawaan:`[README.md]`) (diperlukan:`false`)

## Bahasa yang Didukung

Bahasa yang didukung dapat ditemukan di sini<https://cloud.google.com/translate/docs/languages>

### Perkembangan

Saran dan kontribusi selalu diterima!

### LISENSI

[DENGAN](./LICENSE)
