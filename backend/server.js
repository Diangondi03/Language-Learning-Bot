import express from 'express';
const app = express();
import cors from 'cors';
import db from './db.js'
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
