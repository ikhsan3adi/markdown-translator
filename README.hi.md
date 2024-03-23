# मल्टीपल मार्कडाउन एक्शन का अनुवाद करें

## रीडमी अनुवाद

-   [अंग्रेज़ी](README.md)
-   [सरलीकृत चीनी](README.zh-CN.md)
-   [परंपरागत चीनी](README.zh-TW.md)
-   [हिंदी](README.hi.md)
-   [फ़्रेंच](README.fr.md)
-   [अरब](README.ar.md)

**रीडमी को किसी भी भाषा में अनुवाद करने के लिए GitHub एक्शन**

यह एक GitHub क्रिया है जो स्वचालित रूप से आपके रेपो में रीडमी को एक निर्दिष्ट भाषा में अनुवादित करती है।

## स्थापित करना

**वर्कफ़्लो फ़ाइल जोड़ें**आपके प्रोजेक्ट के लिए (उदा.`.github/workflows/readme.yml`):

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

## काँटा

:चेतावनी: दौड़ना न भूलें`npm run build`प्रतिबद्ध होने से पहले

## विन्यास

### विकल्प

आप निम्नलिखित विकल्पों के साथ कार्रवाई को आगे कॉन्फ़िगर कर सकते हैं:

-   `LANG`: वह भाषा जिसमें आप अपने रीडमी का अनुवाद करना चाहते हैं। डिफ़ॉल्ट सरलीकृत चीनी है. (मैं घाना का निवासी हूं) समर्थित भाषाएं नीचे पाई जा सकती हैं।
    (गलती करना:`zh-CH`) (आवश्यक:`false`)

-   `FILES`: उन मार्कडाउन फ़ाइलों की न्यूलाइन-अलग की गई सूची जिनका आप अनुवाद करना चाहते हैं। (गलती करना:`[README.md]`) (आवश्यक:`false`)

## समर्थित भाषाएँ

समर्थित भाषाएँ यहाँ पाई जा सकती हैं[हत्तपः://क्लाउड.गूगल.कॉम/ट्रांसलेट/डॉक्स/लैंग्वेजेज](https://cloud.google.com/translate/docs/languages)

### विकास

सुझावों और योगदानों का हमेशा स्वागत है!

### लाइसेंस

[साथ](./LICENSE)
