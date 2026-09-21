# HTMLからAstroへ移行する授業用デモ

慶應太郎は架空の人物です。Gemini Canvasで作成したHTMLを出発点に、VS CodeとGitHub CopilotでAstroへ移行する操作例です。受講者は同じサイトを再現するのではなく、自分の企画に書き換えます。

## 最初の状態

- `index.html`：Geminiからダウンロードした単一HTML。
- ローカル表示：VS CodeのLive Serverで`index.html`を開く。
- HTML公開：GitHub PagesのDeploy from a branchでmain / (root)。
- 移行前にHTML版をcommit・pushし、GitHubで保存を確認する。

## Astro移行後の構成

- `src/pages/index.astro`：トップページ。
- `src/layouts/Layout.astro`：共通HTML、ヘッダー、フッター。
- `src/components/`：作品ギャラリーと記事一覧の部品。
- `src/styles/global.css`：HTML版の配色、文字、余白、レスポンシブCSS。
- `src/pages/news/*.md`：5記事の本文とfrontmatter。
- `src/pages/news/index.astro`：Markdownを `import.meta.glob` で読み込む記事一覧。
- `src/pages/cms-news/`：ビルド時に取得したmicroCMS記事の一覧と、`/cms-news/[id]/` の静的詳細ページ。
- `src/lib/microcms.ts`：microCMSの全件ページングと、設定・API・応答異常時にビルドを停止する取得処理。

## ローカル起動

Node.js 22.22.0以上で以下を実行します。

```sh
npm install
npm run dev
```

公開用の静的ビルドは `npm run build`、生成物の確認は `npm run preview` です。

## Googleフォーム

トップの連絡先には授業用のGoogleフォームを埋め込んでいます。フォーム内で送信が完了しても、外側のページから成功状態を推測する処理はありません。実在する個人情報は入力せず、架空の名前と `example.com` のメールアドレスで試してください。標準埋め込みの下の「独自デザインの例」または `/contact-custom/` では、通常のHTML `form` をGoogleの `formResponse` へPOSTし、`target="_blank"` で開いたGoogle側の画面を利用者が確認します。`fetch`、`no-cors`、隠しiframeによる送信結果の推測は行いません。

独自フォームの質問を変更した場合は、Googleフォームの事前入力画面で各質問の`entry.*`項目IDと必須条件を再確認してからコードを更新してください。

## microCMS

サービスドメイン `web-class-html-to-astro` の `news` APIをAstroのビルド中だけ取得します。公開記事はトップと `/news/` に既存Markdown記事と混在して日付順で静的生成され、CMS専用一覧は `/cms-news/`、個別詳細は `/cms-news/実際のID/` です。記事の追加・編集後はGitHub Actionsで再ビルドし、Pagesへ反映します。複数ページ取得と設定/APIエラーによるビルド停止に対応しています。

APIキーはブラウザへ渡さず、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` をビルド時だけ使います。APIキーは公開記事GETだけの最小権限に設定してください。値は [`.env.example`](.env.example) の例を参考に、実際の `.env` へ用意します。実際のキーや記事データはリポジトリへ書き込みません。

## 記事の追加

`src/pages/news/` にMarkdownファイルを追加します。ファイル名が静的URLのスラッグになります。frontmatterは次の形式です。

```md
---
layout: ../../layouts/NewsLayout.astro
title: "記事タイトル"
date: "2026-09-21"
category: "制作ノート"
summary: "一覧に表示する概要"
---

本文を書きます。
```

トップと記事一覧は同じMarkdownを日付降順で参照し、記事ページは `NewsLayout.astro` から一覧へ戻れます。

## HTML版とGit履歴

Astro移行前のHTML版はGitの `b48d3ef`（`HTML版を保存（Astro移行前）`）で保存されています。比較用HTMLは [docs/design/original.html](docs/design/original.html) に保持しています。

## GitHub Pages

`astro.config.mjs` は `site: 'https://hayato1031.github.io'`、`base: '/web-class-html-to-astro'`、`output: 'static'` です。`.github/workflows/deploy.yml` は `main` へのpush、`workflow_dispatch`、`repository_dispatch`（`microcms`）の3種類で、GitHub Pages環境へAstroの静的ビルドを公開します。

GitHubリポジトリの Settings > Pages > Build and deployment で Source を **GitHub Actions** に切り替えてから、`main`へpushするか Actions の `workflow_dispatch` を実行してください。公開前は移行用ブランチで表示とビルドを確認し、変更をcommitしてからmainへ取り込みます。

## 公開と更新

コードを変更した場合もmicroCMSの記事追加・編集の場合も、GitHub Actionsで再ビルドしてPagesへ反映します。Workflowは`main`へのpush、手動実行、`repository_dispatch`の`microcms`イベントで同じbuild・Pages deployを実行します。GitHub ActionsのbuildにはRepository secretsの `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を渡します。

microCMS WebhookからGitHub Actionsを起動するためのfine-grained PATは、このリポジトリだけを対象にし、Contentsのread/write権限、30日有効で用意します。Webhookのeventは `microcms` です。PATの値やAPIキーはREADMEやリポジトリへ書きません。

公開URL：https://hayato1031.github.io/web-class-html-to-astro/
