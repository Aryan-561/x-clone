import express from 'express';
import cors from 'cors';
import router from './routes/userRoutes.js';
const app = express();
app.use(cors(
    {
        origin: '*',
        methods: ['GET', "PATCH", 'POST', 'PUT', 'DELETE'],

    }
))
app.use(express.json());
app.use(express.urlencoded(
    { extended: true }

))

app.use('/api/v1/users', router);
export default app