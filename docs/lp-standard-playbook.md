# LP公開 標準手順書

> 作成済みのLPを公開するための手順書。
> **本番環境: GitHub Pages** （カスタムドメイン `rakuup.com` 設定済み）

---

## 環境構成

| 環境 | サービス | URL | 用途 |
|---|---|---|---|
| **本番** | GitHub Pages | `https://rakuup.com/` | 一般公開（SEO・OGP対象） |

> **注意**: `canonical`・`og:url`・`sitemap.xml` 等のSEOメタ情報は**本番URL（`https://rakuup.com/`）**に設定すること。

> **変更履歴**: 2026-04-01 に Netlify（`raku-up.netlify.app`）から GitHub Pages へ移行。
> Netlify無料プランのクレジット超過によりサイトが停止（Paused）されたため、GitHub Pages に移行。
> カスタムドメイン `rakuup.com`（ムームードメインで取得）を GitHub Pages に設定。

---

## 前提

| 項目 | 値 |
|---|---|
| ブランチ | `master` |
| 必須ファイル | ルート直下に `index.html` |
| GitHub アカウント | `keisuke-saito25` |
| リポジトリ | `ec_unyodaiko_lp` |
| カスタムドメイン | `rakuup.com`（ムームードメインで管理） |

---

## A. GitHub Pages 本番環境

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

### A-3. カスタムドメイン設定

1. リポジトリのルートに `CNAME` ファイルを作成（内容: `rakuup.com`）
2. GitHub Settings → Pages → Custom domain に `rakuup.com` を入力 → **Save**
3. **Enforce HTTPS** をオンにする

### A-4. DNS設定（ムームードメイン）

ムームードメインのカスタム設定（設定2）で以下を登録：

| サブドメイン | 種別 | 内容 |
|---|---|---|
| （空） | A | `185.199.108.153` |
| （空） | A | `185.199.109.153` |
| （空） | A | `185.199.110.153` |
| （空） | A | `185.199.111.153` |
| www | CNAME | `keisuke-saito25.github.io` |
| （空） | TXT | Google Search Console 認証用（削除しない） |

### A-5. 確認

- `https://rakuup.com/` でアクセス可能になるまで待つ（DNS反映: 数分〜数時間）
- HTTPS が有効であることを確認（SSL証明書の発行に10〜30分かかる場合あり）

---

## 更新時

```bash
git add .
git commit -m "変更内容"
git push
```

- **GitHub Pages**: プッシュ後1〜5分で自動反映

キャッシュが残る場合は `Ctrl+Shift+R`（スーパーリロード）。

---

## SEO メタ情報

本番URL（`https://rakuup.com/`）に設定済み。変更時は以下を確認：

### index.html

```html
<link rel="canonical" href="https://rakuup.com/">
<meta property="og:url" content="https://rakuup.com/">
<meta property="og:image" content="https://rakuup.com/images/authority-badges.png">
<meta name="twitter:image" content="https://rakuup.com/images/authority-badges.png">

<!-- 構造化データ内 -->
"url": "https://rakuup.com/"
```

### sitemap.xml

```xml
<loc>https://rakuup.com/</loc>
<loc>https://rakuup.com/privacy.html</loc>
```

### robots.txt

```
Sitemap: https://rakuup.com/sitemap.xml
```

---

## Google Search Console

| 項目 | 設定内容 |
|---|---|
| **プロパティタイプ** | ドメインプロパティ |
| **ドメイン** | `rakuup.com` |
| **所有権確認** | DNS（TXT レコード）で確認済み |
| **サイトマップ** | `https://rakuup.com/sitemap.xml` 送信済み（3ページ検出） |
| **インデックス登録** | トップページをリクエスト済み（2026-04-01） |

---

## 公開前チェック

- [ ] `index.html` がルート直下にあるか
- [ ] `CNAME` ファイルがルート直下にあるか（カスタムドメイン用）
- [ ] 画像パスが相対パスか（例: `images/hero.jpg`）
- [ ] 画像ファイル名の大文字小文字がHTMLと一致しているか
- [ ] フォームのアクセスキーが本番用か（Web3Forms利用時）
- [ ] SEOメタ情報（canonical, og:url 等）が本番URL（`https://rakuup.com/`）になっているか
- [ ] `https://rakuup.com/` で正常表示されるか

---

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| 404 | `index.html` がルートにあるか確認。ブランチが `master` か確認 |
| 画像が出ない | パスの大文字小文字を確認（GitHub Pages は区別する） |
| 反映されない | `git push` 完了を確認 → 数分待つ → スーパーリロード |
| HTTPS が無効 | GitHub Settings → Pages → Enforce HTTPS をオンにする。SSL証明書の発行に10〜30分かかる |
| DNS check unsuccessful | ムームードメインのA/CNAMEレコードが正しいか確認。`nslookup rakuup.com 8.8.8.8` で確認 |
| カスタムドメインが反映されない | `CNAME` ファイルがリポジトリに存在するか確認 |

---

## GitHub Pages の制限

| 項目 | 制限 |
|---|---|
| リポジトリサイズ | 推奨 1GB 以下 |
| 帯域 | 100 GB/月（ソフトリミット） |
| デプロイ数 | 10回/時間 |
| サイトサイズ | 推奨 1GB 以下 |

> LP運用フェーズでは上記制限に達することはまずない。
> Netlifyと異なり、制限超過でサイトが自動停止されることはなく、GitHubから連絡が来る形式。
