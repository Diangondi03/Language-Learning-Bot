import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js';
import authMiddleware from './middleware/AuthMiddleware';

import { GoogleGenerativeAI }  from "@google/generative-ai";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3000;

app.use('/auth', authRoutes);
app.use('/user',authMiddleware,userRoutes);
app.use('/chat',authMiddleware,chatRoutes);
app.use('/message',authMiddleware,messageRoutes);

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

app.post("/gemini", async (req, res) => {
    try {
      const { prompt,history} = req.body;

      const text = await generateText(prompt,history);

      res.json({ text });

      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
