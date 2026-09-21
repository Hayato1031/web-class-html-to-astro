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

## ローカル起動

Node.js 22.22.0以上で以下を実行します。

```sh
npm install
npm run dev
```

公開用の静的ビルドは `npm run build`、生成物の確認は `npm run preview` です。

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

`astro.config.mjs` は `site: 'https://hayato1031.github.io'`、`base: '/web-class-html-to-astro'`、`output: 'static'` です。`.github/workflows/deploy.yml` は `main` へのpushまたは `workflow_dispatch` で、GitHub Pages環境へAstroの静的ビルドを公開します。

GitHubリポジトリの Settings > Pages > Build and deployment で Source を **GitHub Actions** に切り替えてから、`main`へpushするか Actions の `workflow_dispatch` を実行してください。公開前は移行用ブランチで表示とビルドを確認し、変更をcommitしてからmainへ取り込みます。

## 実演の確認範囲

VS CodeのGitHub CopilotでHTMLをAstro 7.3.3へ移行しました。作品詳細と戻る、記事カテゴリの絞り込み、Markdown記事追加、記事URLの再読み込み、狭い画面幅を確認しています。GoogleフォームとmicroCMSはこの実演には接続していません。

公開URL：https://hayato1031.github.io/web-class-html-to-astro/
