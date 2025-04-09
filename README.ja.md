# Edge TTS MCP

Microsoft Edge テキスト読み上げサービスのためのモデルコンテキストプロトコル（MCP）サーバーで、AI アシスタントが自然な音声でテキストを読み上げることを可能にします。

## 機能

- テキストから自然な音声を生成
- 複数の音声オプションをサポート
- カスタマイズ可能な音声パラメータ（速度、音量、ピッチ）
- オプションの音声保存機能
- Cline や他の MCP 対応クライアントとの簡単な統合

## インストール

### 前提条件

- [Node.js](https://nodejs.org/) (v16以降)
- [Bun](https://bun.sh/) (v1.0.0以降)

### セットアップ

1. リポジトリをクローン:

```bash
git clone https://github.com/Hwenyi/edge-tts-mcp.git
cd edge-tts-mcp
```

2. 依存関係のインストール:

```bash
bun install
```

3. プロジェクトのビルド:

```bash
bun run build
```

## 設定

### 環境変数

Edge TTS MCPサーバーは以下の環境変数をサポートしています:

| 変数名      | 説明                      | デフォルト値          | 設定例                                       |
|-------------|--------------------------|---------------------|---------------------------------------------|
| `VOICE`     | 音声生成に使用する声       | `zh-CN-XiaoxiaoNeural`| `en-US-AriaNeural`, `ja-JP-NanamiNeural`   |
| `RATE`      | 音声の速度                | `0%`                 | `-10%`, `+20%`                              |
| `VOLUME`    | 音声の音量                | `0%`                 | `-50%`, `+50%`                              |
| `PITCH`     | 音声のピッチ              | `0Hz`                | `-10Hz`, `+5Hz`                             |
| `SAVE_AUDIO`| 音声ファイルを保存するか   | `false`              | `true`                                      |

サーバーを起動する前に、これらの環境変数を設定できます。

## 使用方法

### サーバーの起動

```bash
# デフォルト設定で起動
bun run start

# または、カスタム設定で起動
VOICE=ja-JP-NanamiNeural RATE="+10%" SAVE_AUDIO=true bun run start
```

### Clineとの統合

[Cline](https://github.com/cfortuner/cline)でこのMCPサーバーを使用するには、Cline設定に以下の設定を追加してください:

```json
{
  "mcpServers": {
    "edge-tts-mcp": {
      "command": "bun",
      "args": [
        "/path/to/edge-tts-mcp/dist/index.js"
      ],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

`/path/to/edge-tts-mcp`を実際のインストールパスに置き換えてください。

### MCPツールのパラメータ

MCPサーバーは以下のツールを提供しています:

**ツール名:** `speech_text_aloud`

**パラメータ:**
- `input` (文字列): 音声に変換して読み上げるテキスト

### Node.jsでの使用

Bunの代わりにNode.jsを使用してサーバーを実行することもできます:

```bash
# まずプロジェクトをビルド
npm run build

# Node.jsで実行
node dist/index.js

# または、カスタム環境変数で実行
VOICE=ja-JP-NanamiNeural RATE="+10%" SAVE_AUDIO=true node dist/index.js
```

Node.jsを使用したCline統合の場合、設定を更新してください:

```json
{
  "mcpServers": {
    "edge-tts-mcp": {
      "command": "node",
      "args": [
        "/path/to/edge-tts-mcp/dist/index.js"
      ],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### 音声ファイルの保存先

環境変数`SAVE_AUDIO`を`true`に設定すると、音声ファイルはデフォルトで`dist`ディレクトリに保存されます。各ファイルは上書きを防ぐためにランダムなUUIDで命名されます。

### 他のクライアントでの設定

#### 5ireまたはClaude Webインターフェース

5ireやClaudeなどの他のクライアントでもこのMCPサーバーを設定できます。以下は設定例です:

```json
{
  "name": "edge-tts-mcp",
  "key": "EdgeTTSMCP",
  "description": "Edge TTSを使用してテキストを読み上げる",
  "command": "bun",
  "args": [
    "/path/to/edge-tts-mcp/dist/index.js"
  ]
}
```

> **⚠️ パス形式の警告:** 設定内のパス形式に注意してください:
> - **Windows**: バックスラッシュ (`\`) を使用し、JSONでは `\\` にエスケープするか、フォワードスラッシュ (`/`) に変換する必要があります
> - **macOS/Linux**: フォワードスラッシュ (`/`) を使用します
> 
> 例:
> - Windowsパス: `C:\\Users\\username\\edge-tts-mcp\\dist\\index.js` または `C:/Users/username/edge-tts-mcp/dist/index.js`
> - macOS/Linuxパス: `/Users/username/edge-tts-mcp/dist/index.js`
>
> 不正確なパス形式は、異なるオペレーティングシステム間での設定問題の一般的な原因です。

実際のインストールディレクトリに合わせてファイルパスを調整してください。

> **⚠️ 重要な注意:** 現在、Cherry-StudioでのMCP統合には既知の問題があります。上記の設定はCherry-Studioでは正常に機能しない可能性があります。これらの問題が解決されるまで、ClineまたはMCPをサポートする他の信頼できるクライアントの使用をお勧めします。

### AIアシスタントでの使用例

AIアシスタントがテキストを読み上げる必要がある場合、次のようなプロンプトを使用できます:

```
このテキストを読み上げてください: 「こんにちは、世界。これはEdge TTSシステムのテストです。」
```

アシスタントは適切な入力テキストで`speech_text_aloud`ツールを呼び出します。

## 音声オプション

Microsoft Edge TTSは多くの言語で様々な音声を提供しています。代表的なオプションは以下の通りです:

- `en-US-AriaNeural` (英語、米国、女性)
- `en-US-GuyNeural` (英語、米国、男性)
- `zh-CN-XiaoxiaoNeural` (中国語、女性)
- `ja-JP-NanamiNeural` (日本語、女性)
- `de-DE-KatjaNeural` (ドイツ語、女性)
- `fr-FR-DeniseNeural` (フランス語、女性)

利用可能な音声の完全なリストについては、[Microsoft Edge TTSドキュメント](https://learn.microsoft.com/ja-jp/azure/cognitive-services/speech-service/language-support?tabs=tts)を参照してください。

## 言語

- [English](./README.md)
- [简体中文](./README.zh-CN.md)

## ライセンス

MIT
