import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(socket) {
    socket.on('error', console.error);

    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    socket.send('Hello! From server');
});

server.listen(8080, () => {
    console.log('WebSocket server is running on ws://localhost:8080');
});
