# Action du traducteur Markdown

## Traduction du fichier README

-   [Anglais](README.md)
-   [Chinois simplifié](README.zh-CN.md)
-   [chinois traditionnel](README.zh-TW.md)
-   [indonésien](README.id.md)
-   [hindi](README.hi.md)
-   [Française](README.fr.md)
-   [arabe](README.ar.md)

**GitHub Action pour traduire les MARKDOWN/README dans n'importe quelle langue**

Traduisez les fichiers MARKDOWN dans diverses autres langues, prend en charge plusieurs fichiers et sous-répertoires.

## Installation

**Ajouter un fichier de workflow**à votre projet (par ex.`.github/workflows/translate-readme.yml`):

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

      - name: Adding README translations
        uses: ikhsan3adi/markdown-translator@master
        with:
          LANG: |- # multiple languages
            zh-CN
            zh-TW
            ja
          FILES: |-
            README.md
            OTHER-README.md
            ...
```

## Fourchette

:avertissement : n'oubliez pas de courir`npm run build`avant de s'engager

## Configuration

### Possibilités

Vous pouvez configurer davantage l'action avec les options suivantes :

-   `LANG`: Liste séparée par des sauts de ligne de la langue dans laquelle vous souhaitez traduire votre fichier Lisez-moi. La valeur par défaut est le chinois simplifié. Les langues prises en charge peuvent être trouvées ci-dessous.
    (défaut:`zh-CN`) (requis:`false`)

-   `FILES`: Liste séparée par des sauts de ligne des fichiers markdown vers lesquels vous souhaitez traduire. (défaut:`[README.md]`) (requis:`false`)

## Langues prises en charge

Les langues prises en charge peuvent être trouvées ici<https://cloud.google.com/translate/docs/languages>

### Développement

Les suggestions et contributions sont toujours les bienvenues !

### LICENCE

[AVEC](./LICENSE)
