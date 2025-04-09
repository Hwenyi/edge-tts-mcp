import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { randomUUID } from "crypto";
import { z } from "zod";
import { EdgeTTS } from "@andresaya/edge-tts";
import symphonia from "@tropicbliss/symphonia";
// Create an MCP server
const server = new McpServer({
    name: "edge-tts-bun-mcp",
    version: "1.0.0"
});
const generateSpeechArgsSchema = {
    input: z.string().describe("the text to generate audio from"),
};
// Add an addition tool
server.tool("speech_text_aloud", "generate lifelike audio from text, and having it read aloud. If there are no special requirements for emotions and tones, pitch and other options remain default", generateSpeechArgsSchema, async (args) => {
    try {
        const tts = new EdgeTTS();
        const input = args.input;
        const isSaveAudio = process.env.SAVE_AUDIO || false;
        const voice = process.env.VOICE || "zh-CN-XiaoxiaoNeural";
        const rate = process.env.RATE || "0%";
        const volume = process.env.VOLUME || "0%";
        const pitch = process.env.PITCH || "0Hz";
        await tts.synthesize(`${input}`, voice, {
            rate,
            volume,
            pitch
        });
        const audioBase64 = tts.toBase64();
        const audioBuffer = Buffer.from(audioBase64, 'base64');
        symphonia.playFromBuf(audioBuffer, { isBlocking: true }); // Play the audio buffer
        // 如果process.env.SAVE_AUDIO为true，则保存音频文件
        if (isSaveAudio === 'true') {
            try {
                const uuid = randomUUID();
                await tts.toFile(`${uuid}`);
            }
            catch (error) {
                console.error("Error saving audio file:", error);
            }
        }
        return {
            content: [{ type: "text", text: "Audio generated and played successfully" }]
        };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: "Error generating audio" }]
        };
    }
});
// Start receiving messages on stdin and sending messages on stdout
async function main() {
    const transport = new StdioServerTransport();
    console.log("Starting server...");
    await server.connect(transport);
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
