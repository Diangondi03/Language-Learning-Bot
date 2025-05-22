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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3000;

app.use('/auth', authRoutes);
app.use('/user',authMiddleware,userRoutes);
app.use('/chat',authMiddleware,chatRoutes);
app.use('/message',authMiddleware,messageRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
