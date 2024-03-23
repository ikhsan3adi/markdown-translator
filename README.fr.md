# Translate Multiple Markdown Action

## Traduction du fichier README

-   [Anglais](README.md)
-   [Chinois simplifié](README.zh-CN.md)
-   [chinois traditionnel](README.zh-TW.md)
-   [hindi](README.hi.md)
-   [Française](README.fr.md)
-   [arabe](README.ar.md)

**GitHub Action pour traduire les README dans n'importe quelle langue**

Il s'agit d'une action GitHub qui traduit automatiquement le fichier Lisez-moi de votre dépôt dans une langue spécifiée.

## Installation

1.  **Ajouter un fichier de workflow**à votre projet (par ex.`.github/workflows/readme.yml`):

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

### Possibilités

Vous pouvez configurer davantage l'action avec les options suivantes :

-   `LANG`: La langue dans laquelle vous souhaitez traduire votre fichier Lisez-moi. La valeur par défaut est le chinois simplifié. (Je suis ghanéen) Les langues prises en charge se trouvent ci-dessous.
    (défaut:`zh-CH`) (requis:`false`)

-   `FILES`: Liste séparée par des sauts de ligne des fichiers markdown vers lesquels vous souhaitez traduire. (défaut:`[README.md]`) (requis:`false`)

## Langues prises en charge

Les langues prises en charge peuvent être trouvées ici<https://cloud.google.com/translate/docs/languages>

### Développement

Les suggestions et contributions sont toujours les bienvenues !

### LICENCE

[AVEC](./LICENSE)
