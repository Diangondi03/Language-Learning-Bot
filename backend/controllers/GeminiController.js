import { GoogleGenerativeAI } from "@google/generative-ai";
import * as asyncHandlerModule from "../middleware/asyncHandler.js";
const asyncHandler = asyncHandlerModule.default;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateText(prompt,history) {
    
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: 
        "You are a friendly and knowledgeable AI assistant specifically designed to help users learn and practice English. " +
        "Your purpose is to explain English grammar, vocabulary, pronunciation, common phrases, idioms, and cultural nuances related to the English language. " +
        "You should also provide examples, exercises, and study tips if it's necessary. " +
        "You can also talk with the user about any topic of its preference if it ask you to do it"+
        "You must **always respond in English**. "+
        "Always end your response with a full stop (period)."
    
  });
  // Start a chat session. This is crucial for maintaining context.
  const chat = model.startChat({
    history: history, 
    generationConfig: {
      maxOutputTokens: 2048, // Limit response length for efficiency
      temperature: 0.5,     // Lower temperature for more focused, less creative responses
      topP: 0.9,
    },
  });
  const result = await chat.sendMessage(prompt)

  return result.response.text();
}

export const generateResponse = asyncHandler( async(req, res) => {
    try {
      const { prompt,history} = req.body;

      const text = await generateText(prompt,history);

      res.json({ text });

      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
})

export const generateTitle = asyncHandler(async (req, res) => {
    try {
      const { message } = req.body;
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: "You are an assistant that generates concise, relevant titles for chat messages. Given a message, return only a suitable title for the conversation. Do not include any explanations or extra text."
      });
      const result = await model.generateContent(message);
      const text = result.response.text();
      res.json({ title: text });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });