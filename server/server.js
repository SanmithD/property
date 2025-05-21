import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db.config.js';
import { contactController } from './controllers/contact.controllers.js';
import buyRouter from './routes/buy.router.js';
import contactRouter from './routes/contact.router.js';
import notificationRouter from './routes/notification.router.js';
import propertyRouter from './routes/property.router.js';
import userRouter from './routes/user.router.js';

connectDB();
const app = express();
const PORT = process.env.PORT || 7000;

const server = http.createServer(app);
const io = new SocketIOServer(server,{
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
})

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("Welcome to Property");
});

app.use('/api/auth', userRouter );
app.use('/api/room', propertyRouter );
app.use('/api/buy', buyRouter );
app.use('/api/contact', contactRouter);
app.use('/api/notification', notificationRouter );

contactController(io);

server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});