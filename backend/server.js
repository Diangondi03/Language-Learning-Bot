import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';
import authRoutes from './routes/auth.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3000;

app.use('/api', authRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
