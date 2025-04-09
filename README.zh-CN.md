# Edge TTS MCP

一个用于Microsoft Edge文本转语音服务的模型上下文协议(MCP)服务器，允许AI助手以自然声音朗读文本。

## 功能特性

- 从文本生成逼真的语音
- 支持多种声音选项
- 可自定义语音参数（语速、音量、音调）
- 可选的音频保存功能
- 轻松与Cline和其他兼容MCP的客户端集成

## 安装

### 前置条件

- [Node.js](https://nodejs.org/) (v16或更高版本)
- [Bun](https://bun.sh/) (v1.0.0或更高版本)

### 设置

1. 克隆仓库:

```bash
git clone https://github.com/Hwenyi/edge-tts-mcp.git
cd edge-tts-mcp
```

2. 安装依赖:

```bash
bun install
```

3. 构建项目:

```bash
bun run build
```

## 配置

### 环境变量

Edge TTS MCP服务器支持以下环境变量:

| 变量名      | 描述                        | 默认值               | 示例值                                     |
|-------------|----------------------------|----------------------|-------------------------------------------|
| `VOICE`     | 用于语音生成的声音           | `zh-CN-XiaoxiaoNeural`| `en-US-AriaNeural`, `ja-JP-NanamiNeural` |
| `RATE`      | 语速                        | `0%`                 | `-10%`, `+20%`                            |
| `VOLUME`    | 音量                        | `0%`                 | `-50%`, `+50%`                            |
| `PITCH`     | 音调                        | `0Hz`                | `-10Hz`, `+5Hz`                           |
| `SAVE_AUDIO`| 是否保存音频文件(true/false) | `false`              | `true`                                    |

您可以在启动服务器前设置这些环境变量。

## 使用方法

### 启动服务器

```bash
# 使用默认设置
bun run start

# 或使用自定义配置
VOICE=en-US-AriaNeural RATE="+10%" SAVE_AUDIO=true bun run start
```

### 与Cline集成

要在[Cline](https://github.com/cfortuner/cline)中使用此MCP服务器，请在Cline配置中添加以下内容:

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

请用您实际的安装路径替换`/path/to/edge-tts-mcp`。

### MCP工具参数

MCP服务器提供以下工具：

**工具名称:** `speech_text_aloud`

**参数:**
- `input` (字符串): 需要转换为语音并朗读的文本

### 使用Node.js

您也可以使用Node.js而不是Bun来运行服务器：

```bash
# 首先构建项目
npm run build

# 用Node.js运行
node dist/index.js

# 或使用自定义环境变量
VOICE=en-US-AriaNeural RATE="+10%" SAVE_AUDIO=true node dist/index.js
```

对于使用Node.js的Cline集成，请更新您的配置：

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

### 音频文件存储

当环境变量`SAVE_AUDIO`设置为`true`时，音频文件将默认保存在`dist`目录中。每个文件都以随机UUID命名，以防止覆盖。

### 其他客户端的配置

#### 5ire 或 Claude

您也可以在5ire或Claude等其他客户端中配置此MCP服务器。以下是一个配置示例：

```json
{
  "name": "edge-tts-mcp",
  "key": "EdgeTTSMCP",
  "description": "使用Edge TTS朗读文本",
  "command": "bun",
  "args": [
    "/path/to/edge-tts-mcp/dist/index.js"
  ]
}
```

> **⚠️ 路径格式警告:** 请注意配置中的路径格式：
> - **Windows**: 使用反斜杠 (`\`)，在JSON中需要转义为 `\\` 或转换为正斜杠 (`/`)
> - **macOS/Linux**: 使用正斜杠 (`/`)
> 
> 示例：
> - Windows路径: `C:\\Users\\username\\edge-tts-mcp\\dist\\index.js` 或 `C:/Users/username/edge-tts-mcp/dist/index.js`
> - macOS/Linux路径: `/Users/username/edge-tts-mcp/dist/index.js`
>
> 不正确的路径格式是不同操作系统之间设置问题的常见原因。

请确保根据您的实际安装目录调整文件路径。

> **⚠️ 重要提示:** 目前，Cherry-Studio中的MCP集成存在已知问题。上述配置可能在Cherry-Studio中无法正常工作。我们建议使用Cline或其他经过良好测试的MCP客户端，直到这些问题得到解决。

### AI助手使用示例

当您的AI助手需要朗读文本时，可以使用如下提示：

```
我需要朗读这段文本："你好，世界，这是Edge TTS系统的测试。"
```

助手将使用适当的输入文本调用`speech_text_aloud`工具。

## 声音选项

Microsoft Edge TTS提供了多种不同语言的声音。一些流行的选项包括：

- `en-US-AriaNeural` (英语，美国，女声)
- `en-US-GuyNeural` (英语，美国，男声)
- `zh-CN-XiaoxiaoNeural` (中文，女声)
- `ja-JP-NanamiNeural` (日语，女声)
- `de-DE-KatjaNeural` (德语，女声)
- `fr-FR-DeniseNeural` (法语，女声)

有关可用声音的完整列表，请参阅[Microsoft Edge TTS文档](https://learn.microsoft.com/zh-cn/azure/cognitive-services/speech-service/language-support?tabs=tts)。

## 许可证

MIT
