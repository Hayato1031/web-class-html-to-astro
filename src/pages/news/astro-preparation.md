---
layout: ../../layouts/NewsLayout.astro
title: "Astroで記事を管理する準備"
date: "2026-09-05"
category: "制作ノート"
summary: "HTMLのプロトタイプからAstroのコンテンツコレクションへ移植するためのディレクトリ構造やMarkdownの設計メモ。"
---
現在のポートフォリオは単一のHTMLファイルで動かしていますが、記事や作品の数が増えてくるとHTMLを直接編集するのは大変になります。そこで、Astroフレームワークへの移行準備を進めています。

## なぜAstroを選ぶのか

Astroは不要なJavaScriptを発行せず、高速なWebサイトを構築できる静的サイトジェネレーターです。Markdown（.md）やMDXを使って記事を書くことができるため、執筆に集中できるメリットがあります。

## 検討中のデータ構造

記事データには以下のようなFrontmatterを定義して管理する予定です。

```yaml
---
title: "記事タイトル"
pubDate: 2026-09-05
category: "制作ノート"
summary: "概要テキスト"
---
```

次回は実際にAstroのプロジェクトを立ち上げ、このHTMLのデザインをコンポーネント分割して移植する手順を記録します。
