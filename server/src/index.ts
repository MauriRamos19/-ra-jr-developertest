import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
const app: Express = express();

dotenv.config()
const PORT = process.env.PORT;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));



app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})