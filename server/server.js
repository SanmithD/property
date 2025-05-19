import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.config.js';
import notificationRouter from './routes/notification.router.js';
import propertyRouter from './routes/property.router.js';
import userRouter from './routes/user.router.js';

connectDB();
const app = express();
const PORT = process.env.PORT || 7000

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("Welcome to Property");
});

app.use('/api/auth', userRouter );
app.use('/api/room', propertyRouter );
app.use('/api/notification', notificationRouter );

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});