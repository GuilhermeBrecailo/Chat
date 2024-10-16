import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    }
});

const users = {};

io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    socket.on('register user', (userId) => {
        users[userId] = socket.id; 
        console.log(`Usuário registrado: ${userId}`);
    });

    socket.on('private message', ({ recipientId, message }) => {
        const recipientSocketId = users[recipientId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('private message', message);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
