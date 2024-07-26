// import express from 'express';
// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';

// const app = express();
// const server = createServer(app);
// const wss = new WebSocketServer({ server });

// wss.on('connection', (socket) => {
//     socket.on('error', console.error);

//     socket.on('message', (data, isBinary) => {
//         wss.clients.forEach(client => {
//             if (client !== socket && client.readyState === WebSocket.OPEN) {
//                 client.send(data, { binary: isBinary });
//             }
//         });
//     });

//     socket.send('Hello! From server');
// });

// server.listen(process.env.NEXT_PUBLIC_SOCKET_PORT , () => {
//     console.log('WebSocket server is running on ws://localhost:8080');
// });
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Define types for messages
type Message = {
  type: string;
  [key: string]: any;
};

// Function to broadcast messages to all connected clients
const broadcast = (data: Message, exceptSocket: WebSocket | null = null) => {
  wss.clients.forEach(client => {
    if (client !== exceptSocket && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (socket: WebSocket) => {
  socket.on('error', console.error);

  socket.on('message', (data: string) => {
    let parsedData: Message;

    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      console.error('Invalid JSON:', error);
      return;
    }

    // Handle different types of messages
    switch (parsedData.type) {
      case 'chatMessage':
        // Handle chat message
        broadcast({ type: 'chatMessage', message: parsedData.message }, socket);
        break;
      case 'orderUpdate':
        // Handle order update
        broadcast({ type: 'orderUpdate', order: parsedData.order });
        break;
      // Add more cases as needed
      default:
        console.error('Unknown message type:', parsedData.type);
    }
  });

  socket.send(JSON.stringify({ type: 'message', text: 'Hello! From server' }));
});

const port = process.env.NEXT_PUBLIC_SOCKET_PORT || 8080;
server.listen(port, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});
