# Raku UP LP 残作業一覧

> **更新日**: 2026-03-10
> **対象**: ec_unyodaiko_lp プロジェクト

---

## 環境構成

| 環境 | サービス | URL | 用途 |
|---|---|---|---|
| **検証** | GitHub Pages | `https://keisuke-saito25.github.io/ec_unyodaiko_lp/` | 開発中の確認・レビュー用 |
| **本番** | Netlify | `https://raku-up.netlify.app/`（※プロジェクト名確定後に変更の可能性あり） | 一般公開用 |

---

## 完成済みの項目 ✅

| カテゴリ | 内容 |
|---|---|
| ページ構成 | Hero / 悩み共感 / 信頼バー / Before→After / ベネフィット / 事例3件 / お客様の声3件 / サービス内容(8項目) / 選ばれる理由3つ / 料金プラン(3フェーズ) / 他社比較表 / 利用の流れ / FAQ(6問) / 限定性 / 無料理由 / フォーム(3ステップ) / 特商法 / フッター |
| デザイン | レスポンシブ対応 / SVGアイコン / パーティクルアニメーション / スクロールアニメーション / 読了プログレスバー / モバイル固定ナビ |
| SEO | title / meta description / OGP(og:url含む) / Twitter Card / canonical / 構造化データ(JSON-LD) / favicon / sitemap.xml / robots.txt |
| 画像最適化 | 全19画像をWebP変換済み（1,830KB→816KB, 55%削減）/ `<picture>` タグでフォールバック対応 / CSS背景も `image-set()` で対応 |
| 法務 | 特定商取引法表記 / プライバシーポリシー(privacy.html) / フォーム内個人情報取り扱い記載 |
| フォーム | 3ステップフォーム / バリデーション / スパム対策(ハニーポット) / プライバシー同意チェック / 送信完了メッセージ |
| 公開手順 | `docs/lp-standard-playbook.md` 作成済み（GitHub Pages + Netlify 手順） |

---

## 🔴 必須（公開前に必ず対応）

### 1. Web3Forms アクセスキーの設定

- **現状**: `value="YOUR_ACCESS_KEY_HERE"`（プレースホルダーのまま）
- **場所**: `index.html` L1170 付近
- **受信メールアドレス**: `rakuup@freeks.biz`
- **対応手順**:
  1. https://web3forms.com/ にアクセス
  2. 受信メールアドレス（`rakuup@freeks.biz`）を入力してアクセスキーを取得
  3. `index.html` の `access_key` の `value` を取得したキーに差し替え
- **重要度**: ⭐⭐⭐（**これが未設定だとフォーム送信が動作しない**）

### 2. GitHub Pages（検証環境）での公開・動作確認

- **現状**: ローカル開発のみ
- **対応手順**: `docs/lp-standard-playbook.md` の「検証環境（GitHub Pages）」手順に従い実施
  1. `git add . && git commit && git push`
  2. Settings → Pages で master ブランチを有効化
  3. `https://keisuke-saito25.github.io/ec_unyodaiko_lp/` でアクセス確認
- **確認項目**:
  - [ ] 全セクションが正常表示されるか
  - [ ] 画像が全て表示されるか（パスの大文字小文字に注意）
  - [ ] フォームが正常に送信されるか（Web3Formsキー設定後）
  - [ ] プライバシーポリシーページへのリンクが動作するか
  - [ ] SP（スマホ）表示が崩れていないか
  - [ ] スムーズスクロール等のJSが動作するか
- **重要度**: ⭐⭐⭐

### 3. Netlify（本番環境）のセットアップ・公開

- **現状**: 未設定
- **対応手順**: `docs/lp-standard-playbook.md` の「本番環境（Netlify）」手順に従い実施
  1. Netlify アカウント作成（GitHub アカウント連携推奨）
  2. 「Add new site」→「Import an existing project」→ GitHub リポジトリ選択
  3. サイト名を `raku-up` に変更（Site settings → Site name）
  4. 公開後、動作確認
- **確認項目**:
  - [ ] 全セクションが正常表示されるか
  - [ ] 画像が全て表示されるか
  - [ ] フォームが正常に送信されるか
  - [ ] SP（スマホ）表示が崩れていないか
  - [ ] HTTPS が有効か
- **重要度**: ⭐⭐⭐

### 4. SEO メタ情報を本番URL（Netlify）に更新

- **現状**: 全て GitHub Pages の URL（`keisuke-saito25.github.io`）で設定済み
- **対応箇所**（`index.html`）:
  - `<link rel="canonical">` → Netlify URL に変更
  - `<meta property="og:url">` → Netlify URL に変更
  - `<meta property="og:image">` → Netlify URL に変更
  - `<meta name="twitter:image">` → Netlify URL に変更
  - 構造化データ（JSON-LD）内の `"url"` → Netlify URL に変更
- **対応箇所**（`sitemap.xml`）:
  - `<loc>` の全URLを Netlify URL に変更
- **対応箇所**（`robots.txt`）:
  - `Sitemap:` の URL を Netlify URL に変更
- **重要度**: ⭐⭐⭐（SEO・SNSシェア時に正しいURLが表示されるために必須）

---

## 🟡 推奨（公開後に順次対応）

### 5. Google Analytics（GA4）の導入

- **現状**: トラッキングタグ未設定（`G-XXXXXXXXXX` プレースホルダー）
- **対応手順**:
  1. [Google Analytics](https://analytics.google.com/) で GA4 プロパティ作成
  2. 測定ID（G-XXXXXXXXXX）を取得
  3. `index.html` と `privacy.html` の `<head>` 内のプレースホルダーを差し替え
- **重要度**: ⭐⭐⭐（アクセス解析に必須）

### 6. コンバージョンイベントの設計・実装

- **現状**: フォーム送信後のCV計測なし
- **対応手順**:
  1. フォーム送信成功時に GA4 イベント発火を追加（`script.js` 内）:
     ```javascript
     gtag('event', 'generate_lead', {
       event_category: 'form',
       event_label: 'free_diagnosis'
     });
     ```
  2. GA4 管理画面でコンバージョンとして設定
- **重要度**: ⭐⭐⭐（広告効果測定・LP改善に必要）

### 7. ページ表示速度の最適化

- **現状**: CSS(69KB) / JS(11KB) が未圧縮
- **対応候補**:
  - CSS/JS の minify（例: `npx -y csso-cli style.css -o style.min.css`）
  - Critical CSS のインライン化（FV部分のCSSを `<style>` で直接記述）
  - 不要な CSS ルールの削除
- **重要度**: ⭐⭐（PageSpeed Insights スコア改善）

---

## 🟢 あると望ましい（改善・拡張）

### 8. メール送信の自前実装（Netlify Functions）

- **現状**: Web3Forms（外部サービス）経由で送信
- **対応候補**:
  - Netlify Functions + Resend / SendGrid でメール送信APIを構築
  - 独自ドメインメールからの送信（`info@raku-up.com` 等）
  - フォーム送信 → Netlify Function → メールAPI → メール受信
- **前提**: 独自ドメイン取得時に併せて対応
- **重要度**: ⭐⭐（ブランディング・信頼性向上）

### 9. アクセシビリティの改善

- **対応候補**:
  - SVGアイコンへの `aria-label` 追加
  - フォーカス指示子（:focus-visible）の視認性向上
  - コントラスト比チェック（WCAG 2.1 AA基準）
  - キーボードナビゲーション対応確認
- **重要度**: ⭐

### 10. 404ページの作成

- **対応**: カスタム `404.html` を作成（Netlify は `404.html` を自動認識する）
- **重要度**: ⭐

### 11. カスタムドメインの設定

- **現状**: `raku-up.netlify.app`（Netlify無料ドメイン）
- **対応**: 独自ドメイン取得 → Netlify の Site settings → Domain management で設定
- **メリット**: ブランディング・信頼性向上、メール送信の自前化(#8)の前提
- **重要度**: ⭐

### 12. サンクスページの作成

- **現状**: フォーム送信後はインラインの完了メッセージのみ
- **対応**: 専用の `thanks.html` を作成 → GA4 でサンクスページ到達をCV測定
- **重要度**: ⭐（CV計測の精度向上・追加訴求の機会）

### 13. CSS/JSの本番ビルド体制構築

- **現状**: 直接編集でビルドパイプラインなし
- **対応候補**: PostCSS + terser 等で minify → GitHub Actions で自動化
- **重要度**: ⭐（長期運用時の開発効率）

---

## 優先度別サマリー

| 優先度 | 件数 | 主な対応 |
|---|---|---|
| 🔴 必須 | 4件 | Web3Formsキー設定・検証環境テスト・本番環境セットアップ・SEOメタ更新 |
| 🟡 推奨 | 3件 | GA4導入・CV設計・速度最適化 |
| 🟢 望ましい | 6件 | メール自前化・a11y・404ページ・カスタムドメイン・サンクスページ・ビルド体制 |

> **推奨手順**: 🔴 Web3Formsキー設定 → 🔴 検証環境テスト → 🔴 本番環境セットアップ → 🔴 SEOメタ更新 → 🟡 GA4導入 → 🟡 CV設計 → 🟡 速度最適化 → 🟢 の順で対応
