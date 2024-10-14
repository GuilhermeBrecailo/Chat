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

app.get('/', (req, res) => {
    res.send('Servidor Socket.IO está funcionando!');
});

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
