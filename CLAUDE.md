# 写真から仕事に使えるイラスト＆デザインを作る ChatGPTプロンプト集（特典ページ）

> 設計の共通原則（基本原則・資産価値の原則・自律解決の原則）は `~/.claude/CLAUDE.md` に従う。

## プロジェクト設定

技術スタック:
  frontend: HTML5 / CSS3 / Vanilla JavaScript（ビルド工程なし・フレームワーク不使用）
  backend: なし
  database: なし
  hosting: GitHub Pages（静的ファイル配信のみ）
  外部フォント: Google Fonts（Noto Serif JP / Noto Sans JP / Cormorant Garamond）

このプロジェクトはビルド・サーバーが不要な完全な静的サイトです。
`index.html` をブラウザで直接開く、または `python3 -m http.server` 等の
簡易サーバーで確認できます。ポート番号のランダム生成・専用バックエンドポートの
割り当ては不要です。

## 環境変数

このプロジェクトは環境変数を使用しません。`.env` 系ファイルは作成しないでください。

## 命名規則

- ファイル: kebab-case（例: `cafe-illustration.jpg`）
- JavaScript変数・関数: camelCase

## ファイル構成・コンテンツの単一の源

このページは `mion-ai-mama/instagram-tokuten-template` の複製として作られましたが、
設計書（`Claude_Code_特典ページ設計書.md`）の指定により、他の特典ページ群とは異なり
`js/content.js` によるコンテンツ分離パターンは採用していません。文章・プロンプトは
すべて `index.html` に直接記述されています（JavaScript無効でも全文読める設計のため）。

- 文章・プロンプトを変更する場合 → `index.html` を直接編集する
- 色・レイアウトを変更する場合 → `style.css` の `:root { }` を編集する
- コピー機能・画像プレースホルダーの動作 → `script.js`（基本的に編集不要）

## コード品質

- 関数: 100行以下 / ファイル: 700行以下 / 複雑度: 10以下 / 行長: 120文字

## 開発ルール

### サーバー起動
- ローカル確認時は `python3 -m http.server <port>` 等の簡易サーバーを1つのみ起動
- 別ポートでの重複起動は避ける

### 画像未配置時の挙動
`assets/` 内の作例写真・イラスト12枚とOGP画像は配置済み（2026-09-05）。
今後差し替える場合も、同じファイル名で `assets/` に上書きするだけでよい。
`<img>` の読み込みに失敗した場合は `script.js` が自動的に、薄い背景色＋ファイル名の
プレースホルダーへ差し替える（レイアウトは崩れない）ため、一時的に画像を外しても
ページは壊れない。

### ドキュメント管理
許可されたドキュメントのみ作成可能:
- `docs/requirements.md`（要件定義）
- `docs/SCOPE_PROGRESS.md`（進捗管理）
- `README.md`（使い方）
- `LICENSE.md`（利用方針）
上記以外のドキュメント作成はユーザー許諾が必要。

### このリポジトリについて
`instagram-tokuten-template` から複製した個別の特典ページ（1回限りの制作物）。
このリポジトリ自体をさらに「Use this template」で複製する運用は想定していない。
