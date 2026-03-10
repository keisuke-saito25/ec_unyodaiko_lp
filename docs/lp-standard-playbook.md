# LP公開 標準手順書

> 作成済みのLPを公開するための手順書。
> **検証環境: GitHub Pages** / **本番環境: Netlify** の2環境構成。

---

## 環境構成

| 環境 | サービス | URL | 用途 |
|---|---|---|---|
| **検証** | GitHub Pages | `https://keisuke-saito25.github.io/ec_unyodaiko_lp/` | 開発中の確認・レビュー |
| **本番** | Netlify | `https://raku-up.netlify.app/` | 一般公開（SEO・OGP対象） |

> **注意**: `canonical`・`og:url`・`sitemap.xml` 等のSEOメタ情報は**本番URL（Netlify）**に設定すること。

---

## 前提

| 項目 | 値 |
|---|---|
| ブランチ | `master` |
| 必須ファイル | ルート直下に `index.html` |
| GitHub アカウント | `keisuke-saito25` |
| Netlify アカウント | GitHub連携で作成（推奨） |

---

## A. 検証環境（GitHub Pages）

### A-1. Git 初期化・プッシュ

```bash
cd <プロジェクトフォルダ>
git init
git branch -M master
git remote add origin https://github.com/keisuke-saito25/<リポジトリ名>.git
git add .
git commit -m "初回コミット"
git push -u origin master
```

### A-2. GitHub Pages 有効化

1. リポジトリの **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **master** / **/ (root)**
4. **Save**

### A-3. 確認

- 数分後に `https://keisuke-saito25.github.io/<リポジトリ名>/` でアクセス可能
- 反映まで1〜5分かかる

---

## B. 本番環境（Netlify）

### B-1. Netlify アカウント作成

1. https://app.netlify.com/ にアクセス
2. 「Sign up」→ **「Sign up with GitHub」** を選択
3. GitHub アカウントで認証

### B-2. サイトの作成（GitHub 連携）

1. Netlify ダッシュボードで **「Add new site」** → **「Import an existing project」**
2. **「Deploy with GitHub」** を選択
3. 対象リポジトリ（`ec_unyodaiko_lp`）を選択
4. ビルド設定:
   - **Branch to deploy**: `master`
   - **Build command**: （空欄のまま ※静的サイトのため不要）
   - **Publish directory**: `.`（ルート直下）
5. **「Deploy site」** をクリック

### B-3. サイト名の変更

デフォルトではランダムな名前が付くため変更する:

1. **Site configuration** → **Site details** → **Change site name**
2. `raku-up` と入力して保存
3. → `https://raku-up.netlify.app/` でアクセス可能に

### B-4. デプロイ確認

1. `https://raku-up.netlify.app/` にアクセス
2. 以下を確認:
   - [ ] 全セクションが正常表示されるか
   - [ ] 画像が全て表示されるか
   - [ ] フォーム送信が動作するか
   - [ ] SP（スマホ）表示が崩れていないか
   - [ ] HTTPS/SSL が有効か
   - [ ] プライバシーポリシーへのリンクが動作するか

---

## 更新時（共通）

```bash
git add .
git commit -m "変更内容"
git push
```

- **GitHub Pages**: プッシュ後1〜5分で自動反映
- **Netlify**: プッシュ後1〜2分で自動ビルド・デプロイ

キャッシュが残る場合は `Ctrl+Shift+R`（スーパーリロード）。

---

## SEO メタ情報の更新

本番URL（Netlify）が確定したら、以下のファイルのURLを更新する。

### index.html

```html
<!-- 変更箇所 -->
<link rel="canonical" href="https://raku-up.netlify.app/">
<meta property="og:url" content="https://raku-up.netlify.app/">
<meta property="og:image" content="https://raku-up.netlify.app/images/authority-badges.png">
<meta name="twitter:image" content="https://raku-up.netlify.app/images/authority-badges.png">

<!-- 構造化データ内 -->
"url": "https://raku-up.netlify.app/"
```

### sitemap.xml

```xml
<loc>https://raku-up.netlify.app/</loc>
<loc>https://raku-up.netlify.app/privacy.html</loc>
```

### robots.txt

```
Sitemap: https://raku-up.netlify.app/sitemap.xml
```

---

## カスタムドメイン（任意・将来対応）

### Netlify でのカスタムドメイン設定

1. ドメインを取得（お名前.com / Cloudflare Registrar 等）
2. Netlify: **Site configuration** → **Domain management** → **Add a domain**
3. ドメインを入力 → DNS設定の指示に従う
4. DNS に CNAME または A レコードを追加
5. HTTPS は Netlify が自動で Let's Encrypt 証明書を発行
6. SEOメタ情報を新しいドメインに更新

### GitHub Pages でのカスタムドメイン設定（検証環境用・通常不要）

1. ルートに `CNAME` ファイル作成（内容: `staging.example.com`）
2. DNS に CNAME レコード追加: `staging.example.com → keisuke-saito25.github.io`
3. Settings → Pages → Custom domain に入力 → Enforce HTTPS ON

---

## 公開前チェック

- [ ] `index.html` がルート直下にあるか
- [ ] 画像パスが相対パスか（例: `images/hero.jpg`）
- [ ] 画像ファイル名の大文字小文字がHTMLと一致しているか
- [ ] フォームのアクセスキーが本番用か（Web3Forms利用時）
- [ ] SEOメタ情報（canonical, og:url 等）が本番URL（Netlify）になっているか
- [ ] 公開URL（検証・本番の両方）で正常表示されるか

---

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| 404 | `index.html` がルートにあるか確認。Netlify は Publish directory が `.` か確認 |
| 画像が出ない | パスの大文字小文字を確認（GitHub Pages は区別する） |
| 反映されない | `git push` 完了を確認 → 数分待つ → スーパーリロード |
| Netlify ビルド失敗 | Netlify ダッシュボードの Deploys → 該当デプロイのログを確認 |
| HTTPS が無効 | Netlify: Site configuration → Domain management → HTTPS を確認 |

---

## Netlify の無料枠に関する注意

| 項目 | 無料枠 |
|---|---|
| 帯域 | 100 GB/月 |
| ビルド | 300分/月 |
| クレジット | 300/月（デプロイ1回=15クレジット → 月約20回） |
| Serverless Functions | 12.5万回/月 |
| フォーム（Netlify Forms使用時） | 100件/月 |

> LP運用フェーズでは月数回のデプロイで十分なため、通常の利用ではクレジット上限に達することはない。
> クレジットが50%・75%・100%に達した際にメール通知が届く。
