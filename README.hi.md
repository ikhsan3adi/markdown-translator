# मार्कडाउन ट्रांसलेटर एक्शन

## रीडमी अनुवाद

-   [अंग्रेज़ी](README.md)
-   [सरलीकृत चीनी](README.zh-CN.md)
-   [परंपरागत चीनी](README.zh-TW.md)
-   [इन्डोनेशियाई](README.id.md)
-   [हिंदी](README.hi.md)
-   [फ़्रेंच](README.fr.md)
-   [अरब](README.ar.md)

**किसी भी भाषा में MARKDOWN/READMEs का अनुवाद करने के लिए GitHub एक्शन**

MARKDOWN फ़ाइलों का विभिन्न अन्य भाषाओं में अनुवाद करें, एकाधिक फ़ाइलों और उपनिर्देशिकाओं का समर्थन करता है।

## स्थापित करना

**वर्कफ़्लो फ़ाइल जोड़ें**आपके प्रोजेक्ट के लिए (उदा.`.github/workflows/translate-readme.yml`):

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

## काँटा

:चेतावनी: दौड़ना न भूलें`npm run build`प्रतिबद्ध होने से पहले

## विन्यास

### विकल्प

आप निम्नलिखित विकल्पों के साथ कार्रवाई को आगे कॉन्फ़िगर कर सकते हैं:

-   `LANG`: जिस भाषा में आप अपने रीडमी का अनुवाद करना चाहते हैं उसकी न्यूलाइन-अलग की गई सूची। डिफ़ॉल्ट सरलीकृत चीनी है. समर्थित भाषाएँ नीचे पाई जा सकती हैं।
    (गलती करना:`zh-CN`) (आवश्यक:`false`)

-   `FILES`: उन मार्कडाउन फ़ाइलों की न्यूलाइन-अलग की गई सूची जिनका आप अनुवाद करना चाहते हैं। (गलती करना:`[README.md]`) (आवश्यक:`false`)

## समर्थित भाषाएँ

समर्थित भाषाएँ यहाँ पाई जा सकती हैं[हत्तपः://क्लाउड.गूगल.कॉम/ट्रांसलेट/डॉक्स/लैंग्वेजेज](https://cloud.google.com/translate/docs/languages)

### विकास

सुझावों और योगदानों का हमेशा स्वागत है!

### लाइसेंस

[साथ](./LICENSE)
