# Raku UP LP タスク一覧

> **更新日**: 2026-03-12（ページ速度最適化 + サンクスページ対応済み）
> **目的**: 楽天市場 運用代行サービス「Raku UP」のLPを Google広告 で運用し、問い合わせを獲得する

---

## ✅ 完了済み

### LP 制作・公開
- [x] LP制作（全セクション: Hero〜フッター、レスポンシブ対応、アニメーション）
- [x] SEO設定（title / OGP / canonical / 構造化データ / sitemap / robots.txt）
- [x] 画像最適化（全19画像 WebP変換）
- [x] 法務対応（特定商取引法表記 / プライバシーポリシー）
- [x] フォーム実装（Web3Forms連携 / 受信: `rakuup@freeks.biz` / スパム対策）
- [x] フォーム送信テスト（メール受信確認済み）

### 公開環境
- [x] 検証環境: GitHub Pages（`https://keisuke-saito25.github.io/ec_unyodaiko_lp/`）
- [x] 本番環境: Netlify（`https://raku-up.netlify.app/`）
- [x] SEOメタ情報を本番URL（Netlify）に更新

### 計測・分析基盤
- [x] GA4 導入（測定ID: `G-QYKKZZSQ5D`）
- [x] CVイベント実装（フォーム送信時に `generate_lead` 自動発火）
- [x] GA4 で `generate_lead` をキーイベント（コンバージョン）に設定
- [x] Google Search Console 登録 + サイトマップ送信

### パフォーマンス最適化
- [x] ページ速度最適化 — CSS圧縮（66KB→48KB、約27%削減）
- [x] サンクスページ作成 — `thanks.html`（フォーム送信後リダイレクト + CV計測精度向上）

---

## ⬜ 残タスク

### 🔴 Google広告出稿時に必須
- [ ] **Google Ads アカウント作成を完了する**
  - https://ads.google.com/ でセットアップウィザードを完了（キャンペーンはスキップ or 一時停止でOK）
- [ ] **GA4 と Google Ads をリンクする**
  - GA4 → 管理 → Google Ads のリンク → リンク作成
- [ ] **Google Ads でコンバージョンをインポートする**
  - Google Ads → ツールと設定 → コンバージョン → インポート → GA4 の `generate_lead` を選択
- [ ] **広告キャンペーンの作成・出稿**
  - 広告文・キーワード・予算の設計
  - ランディングページURLに `https://raku-up.netlify.app/` を設定

### 🟡 推奨（広告効果を高める）
- [x] **ページ速度の最適化** — CSS圧縮完了（66KB→48KB）。品質スコア向上 → CPC低下
- [x] **サンクスページ作成** — `thanks.html` 作成済み。CV計測精度向上 + 今後の流れ案内

### 🟢 あると望ましい
- [ ] メール送信の自前化（Netlify Functions）
- [ ] アクセシビリティ改善
- [ ] 404ページ作成
- [ ] カスタムドメイン設定
- [ ] CSS/JSビルド自動化（GitHub Actions）
