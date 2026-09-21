export const works = [
  {
    id: 'machi-no-yohaku',
    title: 'まちの余白',
    year: '2026',
    role: 'UIデザイン / フロントエンド',
    summary: '都市の中にある「ベンチ」や「小さな広場」など、ひとやすみできる余白スポットを共有・検索する回遊マップUIプロトタイプ。',
    description: `<p>「まちの余白」は、都市を歩く中で見つけた「誰もが少し休める場所」を地図上に可視化するWebプロトタイプです。</p><h2>制作の背景</h2><p>目的地へ最短で移動することだけが重視されがちな街歩きの中で、偶発的な休憩や佇む時間を楽しめるインターフェースを目指しました。</p><h2>工夫したポイント</h2><ul><li>情報量を極限まで絞り込み、視覚的なノイズを減らしたマップデザイン</li><li>時間帯ごとの「日陰」「静かさ」の印象をアイコンと温かみのあるカラーで表現</li><li>モバイル端末で片手操作しやすい下部ナビゲーションシート</li></ul>`,
    svg: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#F3EFEA"/><circle cx="200" cy="200" r="120" fill="#E6DFD5" opacity="0.6"/><path d="M150,250 Q280,100 450,220 T700,180" fill="none" stroke="#C45535" stroke-width="4" stroke-dasharray="8 8"/><circle cx="450" cy="220" r="12" fill="#C45535"/><circle cx="450" cy="220" r="24" fill="none" stroke="#C45535" stroke-width="2" opacity="0.5"/><rect x="520" y="80" width="200" height="140" rx="8" fill="#FFFFFF"/><rect x="540" y="110" width="120" height="12" rx="4" fill="#24211D"/><rect x="540" y="135" width="160" height="8" rx="4" fill="#6C665F" opacity="0.5"/><rect x="540" y="150" width="90" height="8" rx="4" fill="#6C665F" opacity="0.3"/></svg>`
  },
  {
    id: 'akari-no-rhythm',
    title: '灯りのリズム',
    year: '2025',
    role: 'フロントエンド / 実験',
    summary: 'Web Audio APIとキャンバス表現を組み合わせ、音と光の揺らぎをインタラクティブに体感できるWebキャンバスワーク。',
    description: `<p>画面へのタッチやクリックに合わせて、光の輪が波紋のように広がり、心地よいトーンが響くデジタルプロトタイプです。</p><h2>制作の背景</h2><p>スクリーンタイムが増える日常の中で、画面と対峙する時間を少しだけ穏やかにするための「意味のない、ただ心地よい時間」を提供する目的で作りました。</p><h2>技術的アプローチ</h2><ul><li>HTML5 Canvas を用いたスムーズなパーティクル描画</li><li>Tone.jsの思想を参考にしたシンプルなオシレーター音階生成</li></ul>`,
    svg: `<svg viewBox="0 0 600 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#F7EAE3"/><stop offset="100%" stop-color="#C45535" stop-opacity="0"/></radialGradient><radialGradient id="grad2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#C45535"/><stop offset="100%" stop-color="#1F1D1B" stop-opacity="0"/></radialGradient></defs><rect width="600" height="400" fill="#1F1D1B"/><circle cx="300" cy="200" r="90" fill="url(#grad1)" opacity="0.8"/><circle cx="300" cy="200" r="140" fill="none" stroke="#F7EAE3" stroke-width="1" opacity="0.3"/><circle cx="220" cy="150" r="40" fill="url(#grad2)" opacity="0.6"/></svg>`
  },
  {
    id: 'ichinichi-ichimai',
    title: '一日一枚',
    year: '2025',
    role: 'デザイン / 実装',
    summary: '毎日撮影した写真を1枚だけ厳選して掲載するミニマルな写真記録Webアーカイブ。',
    description: `<p>SNSのようにタイムラインを流し見するのではなく、1枚の写真と数行の短い言葉に集中できる個人ギャラリーサイトです。</p><h2>デザインの意図</h2><p>余白を最大限に活かし、写真が持っている色合いや雰囲気を壊さないトーン（アイボリーとダークグレー）で構築しています。</p>`,
    svg: `<svg viewBox="0 0 600 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="400" fill="#EAE5DE"/><rect x="150" y="60" width="300" height="250" fill="#FFFFFF" rx="4"/><rect x="170" y="80" width="260" height="180" fill="#D8D0C5"/><circle cx="300" cy="170" r="35" fill="#24211D" opacity="0.2"/><rect x="170" y="275" width="100" height="10" rx="3" fill="#6C665F" opacity="0.4"/></svg>`
  }
];
