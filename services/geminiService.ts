import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
    try {
        const audioPart = {
            inlineData: {
                data: base64Audio,
                mimeType,
            },
        };

        const textPart = {
            text: "Transcribe this audio recording of a meeting. Provide only the transcribed text.",
        };

        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [audioPart, textPart] },
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error transcribing audio:", error);
        throw new Error("Failed to transcribe audio. Please check the console for details.");
    }
};

export const summarizeText = async (textToSummarize: string): Promise<string> => {
    if (!textToSummarize) {
        throw new Error("Cannot summarize empty text.");
    }
    try {
        const prompt = `Please summarize the following meeting transcript. Use markdown for formatting.
Focus on key decisions and action items.
Present the summary as a list of bullet points using '*' or '-'.

Transcript:
---
${textToSummarize}
---

Summary (in Markdown):`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error summarizing text:", error);
        throw new Error("Failed to summarize text. Please check the console for details.");
    }
};