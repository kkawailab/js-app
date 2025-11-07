# e-Stat API 統計データ可視化アプリケーション

本アプリケーションは「[政府統計の総合窓口(e-stat) API 機能](https://www.e-stat.go.jp/api/)」(以下、e-Stat API)から公開されているデータを取得し、Webブラウザ上で可視化を行います。

データの描画方法は、「棒グラフ」、「折れ線グラフ」、「散布図」、「地図」の4種類から選択できます。
また、ご自身が保有するデータを読み込み、e-Stat APIから取得したデータと組み合わせた分析を行えます。

## 主な特徴

- ✅ **サーバー不要**: HTML、CSS、JavaScriptのみで構成されており、サーバーを用意する必要はありません
- ✅ **セキュア通信**: すべての通信でHTTPSを使用（2024年更新）
- ✅ **モジュラー設計**: 保守性の高いモジュール構造（2024年リファクタリング）
- ✅ **エラー表示**: ユーザーフレンドリーなエラーメッセージ表示
- ✅ **4種類のグラフ**: 棒グラフ、折れ線グラフ、散布図、地図
- ✅ **カスタムデータ対応**: 独自のJSONデータを読み込み可能

## 必要なもの

1. **インターネット接続**: e-Stat APIからデータを取得するため必要です
2. **AppId**: e-Stat APIの利用に必要です（下記参照）
3. **モダンブラウザ**: Chrome、Safari、Firefox、Edge等

## セットアップ

### 1. AppIdの取得

[e-Stat APIサイト](https://www.e-stat.go.jp/api/)でAppIdを取得してください。
AppIdがないと本アプリケーションは動作しません。

### 2. アプリケーションの起動

`index.html`をブラウザで開いてください。

```bash
# ブラウザで直接開く
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# または、ローカルサーバーを使用（推奨）
python -m http.server 8000
# ブラウザで http://localhost:8000 にアクセス
```

### 3. AppIdの設定

初回起動時にプロンプトでAppIdの入力を求められます。
取得したAppIdを入力すると、localStorage（またはCookie）に保存されます。

## 使い方

### 統計データの読み込み

1. アプリケーション左上の「データの追加等」をクリック
2. 統計IDを入力（複数可）
3. 「ロード」ボタンをクリック

統計IDはe-Stat APIサイトで確認できます。

### URLパラメータでの読み込み

URLパラメータで統計IDを指定することもできます：

```
index.html?statIds=統計ID1,統計ID2
```

### データの描画

グラフ種類セレクターから描画方法を選択できます：

- **棒グラフ**: カテゴリ別の比較
- **折れ線グラフ**: 時系列データの傾向
- **散布図**: 2つの統計データの相関関係（X軸・Y軸で異なるデータを選択）
- **地図**: 都道府県別の地理的分布

### カスタムデータの読み込み

e-Stat API形式に準拠したJSONファイルを読み込めます：

```json
{
  "METADATA": { /* e-STAT APIから取得できるメタデータと同じ形式 */ },
  "STATDATA": { /* e-STAT APIから取得できる統計データと同じ形式 */ }
}
```

1. 「データの追加等」をクリック
2. ファイル選択ボックスからJSONファイルを選択
3. 「ロード」ボタンをクリック

**注意**: IE11ではローカルでのファイル読み込み機能が制限されます。Webサーバー経由でご利用ください。

## 技術仕様

### 使用ライブラリ

- **jQuery 2.1.4**: DOM操作とAJAX
- **jQuery UI 1.11.4**: UIコンポーネント
- **D3.js v3**: データ可視化
- **Leaflet.js 0.7.7**: 地図表示
- **ES6 Promise Polyfill 3.0.2**: 非同期処理

### ファイル構成

```
js-app/
├── index.html              # メインHTML
├── style.css               # スタイルシート
├── main.js                 # メインアプリケーション
├── js/
│   ├── core/
│   │   ├── constants.js    # 定数定義
│   │   ├── utils.js        # ユーティリティ関数
│   │   └── eventer.js      # イベントシステム
│   └── api/
│       └── estatAPI.js     # e-Stat API ラッパー
└── README.md               # このファイル
```

## 最近の改善点（2024年リファクタリング）

### セキュリティ強化
- すべてのHTTP URLをHTTPSに変更
- 安全な通信の確保

### コード品質向上
- モジュール構造への分割（保守性向上）
- マジックナンバーを定数化（可読性向上）
- バグ修正（不適切な例外処理の削除）

### ユーザー体験改善
- エラーメッセージの視覚的表示
- より詳細なエラー情報の提供
- Cookie処理の改善（複数Cookie対応）

## 対応ブラウザ

以下のブラウザで動作確認済み：

- ✅ Google Chrome（最新版推奨）
- ✅ Apple Safari（最新版推奨）
- ✅ Mozilla Firefox（最新版推奨）
- ✅ Microsoft Edge（最新版推奨）
- ⚠️ Microsoft Internet Explorer 11（一部機能制限あり）

## トラブルシューティング

### エラーが表示される場合

- **「データの取得に失敗しました」**: インターネット接続とAppIdを確認してください
- **「API エラー」**: 統計IDが正しいか確認してください
- **「ローカルストレージが使用できません」**: Webサーバー経由での利用を推奨します

### ファイルアップロードができない場合

IE11をローカルで使用している場合、以下のいずれかの方法をお試しください：

1. Webサーバー経由で利用する（推奨）
2. 別のブラウザ（Chrome、Firefox等）を使用する

## 開発者向け情報

### カスタマイズ

ソースコードを改良することで、他の可視化手法への対応が可能です。

詳細な技術情報は `CLAUDE.md` を参照してください。

### 定数のカスタマイズ

`js/core/constants.js` で以下の設定を変更できます：

- チャートのマージン設定
- アニメーション速度
- Cookie有効期限
- その他の定数

## ライセンス

MIT License

Copyright (c) 2016 National Statistics Center

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 更新履歴

### 2024年12月 - UI/UXモダナイゼーション
- 🎨 **モダンデザインシステム導入**
  - CSS変数による統一されたデザイントークン
  - モダンなカラーパレット（Indigo/Cyan/Gray）
  - 4段階のシャドウとデプス効果
  - スムーズなアニメーションとトランジション

- 📱 **完全レスポンシブ対応**
  - モバイルファースト設計
  - 3つのブレークポイント（1024px/768px/480px）
  - タブレット・スマートフォン最適化
  - タッチフレンドリーなインターフェース

- ✨ **UIコンポーネント改善**
  - グラデーション背景のヘッダー
  - カードベースのレイアウト
  - ホバーエフェクト（浮き上がり効果）
  - マイクロインタラクション
  - 改善されたモーダルとツールチップ
  - カスタムスクロールバー

- ♿ **アクセシビリティ向上**
  - ビューポートメタタグ追加
  - セマンティックHTML構造
  - 印刷用スタイル
  - キーボードナビゲーション対応

### 2024年11月 - リファクタリング
- 🔒 **セキュリティ強化**
  - すべてのHTTP URLをHTTPSに変更
  - 安全な通信の確保

- 🏗️ **コード品質向上**
  - モジュール構造への分割（保守性向上）
    - `js/core/constants.js` - 定数定義
    - `js/core/utils.js` - ユーティリティ関数
    - `js/core/eventer.js` - イベントシステム
    - `js/api/estatAPI.js` - API ラッパー
  - マジックナンバーを定数化（可読性向上）
  - バグ修正（不適切な`throw false;`の削除）

- 💬 **ユーザー体験改善**
  - エラーメッセージの視覚的表示
  - より詳細なエラー情報の提供
  - Cookie処理の改善（複数Cookie対応）
  - ローディング状態の改善

- 📚 **ドキュメント整備**
  - `CLAUDE.md` 追加（開発者向けガイド）
  - README.md 全面刷新
  - コードコメントの追加

### 2016年3月 - 初回リリース
- 📊 **基本機能実装**
  - e-Stat API連携
  - 4種類のグラフ対応（棒・折れ線・散布図・地図）
  - カスタムデータ読み込み機能
  - リアルタイムデータ可視化
