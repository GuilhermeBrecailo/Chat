
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

app.get('/', (req, res) => {
  res.send('Servidor Socket.IO está funcionando!');
});


io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`)


  socket.on('private message', ({ recipientId, text, sender, senderName }) => {
   
    const recipientSocketId = recipientId;
    
    if (recipientSocketId) {
        io.to(recipientSocketId).emit('private message', { senderName, sender, text });
        console.log('Mensagem enviada para:', recipientId);
    } else {
        console.log('recipientSocketId não encontrado para:', recipientId);
    }
    console.log('recipientId: ',recipientId )
    console.log('sender: ', sender)
    console.log('recipientSocketId: ',recipientSocketId)
});

  
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Servidor Socket.IO rodando em http://localhost:${PORT}`)
})
