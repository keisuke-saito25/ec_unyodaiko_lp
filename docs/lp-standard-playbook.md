# LP公開 標準手順書

> 作成済みのLPをGitHub Pagesで公開するための汎用手順。

---

## 前提

| 項目 | 値 |
|---|---|
| ホスティング | GitHub Pages（無料・SSL対応） |
| ブランチ | `master` |
| 必須ファイル | ルート直下に `index.html` |
| GitHubアカウント | `keisuke-saito25` |
| 公開URL形式 | `https://keisuke-saito25.github.io/<リポジトリ名>/` |

---

## 公開手順

### 1. Git初期化

```bash
cd <プロジェクトフォルダ>
git init
git branch -M master
```

### 2. GitHubリポジトリ作成

- GitHub上で新規リポジトリを作成（Public）
- リポジトリ名 = 公開URLのパスになる

### 3. プッシュ

```bash
git remote add origin https://github.com/keisuke-saito25/<リポジトリ名>.git
git add .
git commit -m "初回コミット"
git push -u origin master
```

### 4. GitHub Pages 有効化

1. リポジトリの **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **master** / **/ (root)**
4. **Save**

### 5. 公開確認

- 数分後に `https://keisuke-saito25.github.io/<リポジトリ名>/` でアクセス可能
- 反映まで1〜5分かかる

---

## 更新時

```bash
git add .
git commit -m "変更内容"
git push
```

プッシュ後1〜5分で自動反映。キャッシュが残る場合は `Ctrl+Shift+R`。

---

## カスタムドメイン（任意）

1. ルートに `CNAME` ファイル作成（内容: `lp.example.com`）
2. DNS に CNAME レコード追加: `lp.example.com → keisuke-saito25.github.io`
3. Settings → Pages → Custom domain に入力 → Enforce HTTPS ON

---

## 公開前チェック

- [ ] `index.html` がルート直下にあるか
- [ ] 画像パスが相対パスか（例: `images/hero.jpg`）
- [ ] 画像ファイル名の大文字小文字がHTMLと一致しているか
- [ ] フォームのアクセスキーが本番用か（Web3Forms利用時）
- [ ] 公開URLで正常表示されるか

---

## トラブルシューティング

| 症状 | 対処 |
|---|---|
| 404 | `index.html` がルートにあるか、Pages設定のブランチを確認 |
| 画像が出ない | パスの大文字小文字を確認（GitHub Pagesは区別する） |
| 反映されない | `git push` 完了を確認 → 数分待つ → スーパーリロード |
