# Raku UP LP 残作業一覧

> **更新日**: 2026-03-10
> **対象**: ec_unyodaiko_lp プロジェクト
> **ステータス**: ✅ **本番公開済み**

---

## 環境構成

| 環境 | サービス | URL | 状態 |
|---|---|---|---|
| **検証** | GitHub Pages | `https://keisuke-saito25.github.io/ec_unyodaiko_lp/` | ✅ 稼働中 |
| **本番** | Netlify | `https://raku-up.netlify.app/` | ✅ 稼働中 |

---

## 完成済みの項目 ✅

| カテゴリ | 内容 |
|---|---|
| ページ構成 | Hero / 悩み共感 / 信頼バー / Before→After / ベネフィット / 事例3件 / お客様の声3件 / サービス内容(8項目) / 選ばれる理由3つ / 料金プラン(3フェーズ) / 他社比較表 / 利用の流れ / FAQ(6問) / 限定性 / 無料理由 / フォーム(3ステップ) / 特商法 / フッター |
| デザイン | レスポンシブ対応 / SVGアイコン / パーティクルアニメーション / スクロールアニメーション / 読了プログレスバー / モバイル固定ナビ |
| SEO | title / meta description / OGP / Twitter Card / canonical / 構造化データ(JSON-LD) / favicon / sitemap.xml / robots.txt → **全て本番URL（Netlify）で設定済み** |
| 画像最適化 | 全19画像をWebP変換済み / `<picture>` タグでフォールバック対応 |
| 法務 | 特定商取引法表記 / プライバシーポリシー(privacy.html) / フォーム内個人情報取り扱い記載 |
| フォーム | Web3Forms 連携済み（受信: `rakuup@freeks.biz`） / 3ステップフォーム / バリデーション / スパム対策 |
| 公開 | GitHub Pages（検証）+ Netlify（本番）の2環境構成で公開完了 |

---

## 🔴 必須（Google広告運用の前に対応）

### 1. Google Analytics（GA4）の導入

- **現状**: トラッキングタグ未設定（`G-XXXXXXXXXX` プレースホルダー）
- **重要性**: **広告を出す前に必須**。GA4 がないと流入数・直帰率・滞在時間等が計測できない
- **対応手順**:
  1. [Google Analytics](https://analytics.google.com/) で GA4 プロパティ作成
  2. 測定ID（G-XXXXXXXXXX）を取得
  3. `index.html` と `privacy.html` の `<head>` 内のプレースホルダーを差し替え
  4. git push → Netlify に自動反映

### 2. Google広告コンバージョンタグの設定

- **現状**: 未設定
- **重要性**: **広告費の費用対効果（CPA）を測定するために必須**
- **対応手順**:
  1. [Google Ads](https://ads.google.com/) でコンバージョンアクションを作成
  2. コンバージョンタグを `index.html` に追加
  3. フォーム送信成功時にコンバージョンを発火（`script.js` に追加）
  4. GA4 とのリンクも設定

### 3. GA4 コンバージョンイベントの設計

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
  3. Google Ads と GA4 をリンク

---

## 🟡 推奨（広告運用開始後に順次対応）

### 4. ページ表示速度の最適化

- **現状**: CSS(69KB) / JS(11KB) が未圧縮
- **広告への影響**: ページ速度が遅いと広告の品質スコアが下がり、CPC（クリック単価）が上がる
- **対応候補**:
  - CSS/JS の minify
  - Critical CSS のインライン化
  - 不要な CSS ルールの削除

### 5. サンクスページの作成

- **現状**: フォーム送信後はインラインの完了メッセージのみ
- **広告への影響**: サンクスページがあると Google Ads のコンバージョン計測がより正確になる
- **対応**: 専用の `thanks.html` を作成 → GA4/Google Ads でサンクスページ到達をCV測定

---

## 🟢 あると望ましい（改善・拡張）

| # | 作業 | 概要 |
|---|---|---|
| 6 | メール送信の自前化 | Netlify Functions + Resend/SendGrid で自社メール送信 |
| 7 | アクセシビリティ改善 | aria-label、コントラスト比、キーボードナビ |
| 8 | 404ページ作成 | カスタム `404.html`（Netlify 自動認識） |
| 9 | カスタムドメイン設定 | 独自ドメイン取得 → Netlify で設定 |
| 10 | ビルド体制構築 | PostCSS + terser で minify → GitHub Actions 自動化 |

---

## 優先度別サマリー

| 優先度 | 件数 | 主な対応 |
|---|---|---|
| 🔴 必須（広告前） | 3件 | GA4導入・Google広告CVタグ・CVイベント設計 |
| 🟡 推奨 | 2件 | 速度最適化・サンクスページ |
| 🟢 望ましい | 5件 | メール自前化・a11y・404・カスタムドメイン・ビルド体制 |

> **推奨手順**: 🔴 GA4導入 → 🔴 Google広告CVタグ → 🔴 CVイベント設計 → 🟡 速度最適化 → 🟡 サンクスページ → 🟢 の順で対応
