# عمل مترجم تخفيض السعر

## اقرأني الترجمة

-   [إنجليزي](README.md)
-   [الصينية المبسطة](README.zh-CN.md)
-   [الصينية التقليدية](README.zh-TW.md)
-   [الاندونيسية](README.id.md)
-   [الهندية](README.hi.md)
-   [فرنسي](README.fr.md)
-   [عربى](README.ar.md)

**إجراء GitHub لترجمة MARKDOWN/READMEs إلى أي لغة**

ترجمة ملفات MARKDOWN إلى لغات أخرى مختلفة، ويدعم ملفات وأدلة فرعية متعددة.

## يثبت

**إضافة ملف سير العمل**لمشروعك (على سبيل المثال`.github/workflows/translate-readme.yml`):

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

## شوكة

:تحذير: لا تنسى الركض`npm run build`قبل الالتزام

## إعدادات

### خيارات

يمكنك تكوين الإجراء بشكل أكبر باستخدام الخيارات التالية:

-   `LANG`: اللغة التي تريد ترجمة الملف التمهيدي إليها. الافتراضي هو الصينية المبسطة. يمكن العثور على اللغات المدعومة أدناه.
    (تقصير:`zh-CN`) (مطلوب:`false`)

-   `FILES`: قائمة مفصولة بسطر جديد لملفات تخفيض السعر التي تريد الترجمة إليها. (تقصير:`[README.md]`) (مطلوب:`false`)

## اللغات المدعومة

اللغات المدعومة يمكن العثور عليها هنا[هتبص://كلود.جوجل.كوم/ترانسلت/دكس/لانججص](https://cloud.google.com/translate/docs/languages)

### تطوير

الاقتراحات والمساهمات هي موضع ترحيب دائما!

### رخصة

[مع](./LICENSE)
