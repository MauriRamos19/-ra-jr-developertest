import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import router from './routes/vehicle.route';
import { protect } from './modules/auth';
import login from './controllers/user.controller';
const app: Express = express();

dotenv.config()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', protect, router);
app.post('/login', login);


app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})