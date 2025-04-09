# Edge TTS MCP

A Model Context Protocol (MCP) server for Microsoft Edge Text-to-Speech service that allows AI assistants to read text aloud with natural-sounding voices.

## Language

- [简体中文](./README.zh-CN.md)
- [日本語](./README.ja.md)

## Features

- Generate lifelike speech from text input
- Support for multiple voice options
- Customizable speech parameters (rate, volume, pitch)
- Optional audio saving capability
- Easy integration with Cline and other MCP-compatible clients

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Bun](https://bun.sh/) (v1.0.0 or later)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Hwenyi/edge-tts-mcp.git
cd edge-tts-mcp
```

2. Install dependencies:

```bash
bun install
```

3. Build the project:

```bash
bun run build
```

## Configuration

### Environment Variables

The Edge TTS MCP server supports the following environment variables:

| Variable    | Description                              | Default Value         | Example Values                                    |
|-------------|------------------------------------------|-----------------------|---------------------------------------------------|
| `VOICE`     | The voice to use for speech generation   | `zh-CN-XiaoxiaoNeural`| `en-US-AriaNeural`, `ja-JP-NanamiNeural`         |
| `RATE`      | The speech rate                          | `0%`                  | `-10%`, `+20%`                                    |
| `VOLUME`    | The speech volume                        | `0%`                  | `-50%`, `+50%`                                    |
| `PITCH`     | The speech pitch                         | `0Hz`                 | `-10Hz`, `+5Hz`                                   |
| `SAVE_AUDIO`| Whether to save audio files (true/false) | `false`               | `true`                                            |

You can set these environment variables before starting the server.

## Usage

### Starting the Server

```bash
# Using default settings
bun run start

# Or with custom configuration
VOICE=en-US-AriaNeural RATE="+10%" SAVE_AUDIO=true bun run start
```

### Integrating with Cline

To use this MCP server with [Cline](https://github.com/cfortuner/cline), add the following configuration to your Cline config:

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

Replace `/path/to/edge-tts-mcp` with the actual path to your installation.

### MCP Tool Parameters

The MCP server exposes the following tool:

**Tool Name:** `speech_text_aloud`

**Parameters:**
- `input` (string): The text to be converted to speech and read aloud

### Using with Node.js

You can also run the server using Node.js instead of Bun:

```bash
# Build the project first
npm run build

# Run with Node.js
node dist/index.js

# Or with custom environment variables
VOICE=en-US-AriaNeural RATE="+10%" SAVE_AUDIO=true node dist/index.js
```

For Cline integration with Node.js, update your configuration:

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

### Audio File Storage

When the `SAVE_AUDIO` environment variable is set to `true`, audio files will be saved in the `dist` directory by default. Each file is named with a random UUID to prevent overwriting.

### Configuration for Other Clients

#### 5ire or Claude Web Interface

You can also configure this MCP server in other clients like 5ire or Claude. Here's an example configuration:

```json
{
  "name": "edge-tts-mcp",
  "key": "EdgeTTSMCP",
  "description": "Read text aloud using Edge TTS",
  "command": "bun",
  "args": [
    "/path/to/edge-tts-mcp/dist/index.js"
  ]
}
```

> **⚠️ Path Format Warning:** Pay attention to the path format in your configuration:
> - **Windows**: Uses backslashes (`\`) and needs to be escaped in JSON as `\\` or converted to forward slashes (`/`)
> - **macOS/Linux**: Uses forward slashes (`/`)
> 
> Examples:
> - Windows path: `C:\\Users\\username\\edge-tts-mcp\\dist\\index.js` or `C:/Users/username/edge-tts-mcp/dist/index.js`
> - macOS/Linux path: `/Users/username/edge-tts-mcp/dist/index.js`
>
> Incorrect path formatting is a common cause of setup issues across different operating systems.

Make sure to adjust the file path according to your actual installation directory.

> **⚠️ Important Notice:** Currently, there are known issues with MCP integration in Cherry-Studio. The configuration above may not work properly in Cherry-Studio. We recommend using Cline or other well-tested MCP clients until these issues are resolved.

### Example Usage in an AI Assistant

When your AI assistant needs to read text aloud, it can use a prompt like:

```
I need to read this text aloud: "Hello world, this is a test of the Edge TTS system."
```

The assistant will call the `speech_text_aloud` tool with the appropriate input text.

## Voice Options

Microsoft Edge TTS provides many voices across different languages. Some popular options include:

- `en-US-AriaNeural` (English, US, Female)
- `en-US-GuyNeural` (English, US, Male)
- `zh-CN-XiaoxiaoNeural` (Chinese, Female)
- `ja-JP-NanamiNeural` (Japanese, Female)
- `de-DE-KatjaNeural` (German, Female)
- `fr-FR-DeniseNeural` (French, Female)

For a complete list of available voices, refer to the [Microsoft Edge TTS documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support?tabs=tts).

## License

MIT
