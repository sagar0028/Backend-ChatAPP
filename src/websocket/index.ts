// import WebSocket from 'ws';
// import { Server } from 'http';
// import { Message, createMessage, ExtWebSocket } from '../helpers/utils/websocket';
//
// export function setupWebSocket(server: Server) {
//     const wss = new WebSocket.Server({ server });
//
//     wss.on('connection', (ws: WebSocket) => {
//         const extWs = ws as ExtWebSocket;
//         extWs.isAlive = true;
//
//         ws.on('pong', () => {
//             extWs.isAlive = true;
//         });
//
//         ws.on('message', (msg: string) => {
//             const message = JSON.parse(msg) as Message;
//             console.log('received: %s', message.content);
//
//             setTimeout(() => {
//                 if (message.isBroadcast) {
//                     wss.clients.forEach(client => {
//                         if (client !== ws) {
//                             client.send(createMessage(message.content, true, message.sender));
//                         }
//                     });
//                 }
//                 ws.send(createMessage(`You sent -> ${message.content}`, message.isBroadcast));
//             }, 1000);
//         });
//
//         ws.send(createMessage('Hi there, I am a WebSocket server. Use the next structure to communicate through the websocket channel.'));
//
//         ws.on('error', (err) => {
//             console.warn(`Client disconnected - reason: ${err}`);
//         });
//     });
//
//     setInterval(() => {
//         wss.clients.forEach((ws: WebSocket) => {
//             const extWs = ws as ExtWebSocket;
//             if (!extWs.isAlive) return ws.terminate();
//             extWs.isAlive = false;
//             ws.ping(null, undefined);
//         });
//     }, 10000);
// }

import WebSocket from 'ws';
import { Server } from 'http';
import { Message, createMessage, ExtWebSocket } from '../utils/websocket';

export let wss: WebSocket.Server;

export function setupWebSocket(server: Server) {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws: WebSocket) => {
        const extWs = ws as ExtWebSocket;
        extWs.isAlive = true;

        ws.on('pong', () => {
            extWs.isAlive = true;
        });

        ws.on('message', (msg: string) => {
            try {
                const message = JSON.parse(msg) as Message;
                console.log('received: %s', message.content);

                setTimeout(() => {
                    if (message.isBroadcast) {
                        wss.clients.forEach(client => {
                            if (client !== ws) {
                                client.send(createMessage(message.content, true, message.sender));
                            }
                        });
                    }
                    ws.send(createMessage(`You sent -> ${message.content}`, message.isBroadcast));
                }, 1000);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        ws.send(createMessage('Hi there, I am a WebSocket server. Use the following structure to communicate through the WebSocket channel.'));

        ws.on('error', (err) => {
            console.warn(`Client disconnected - reason: ${err}`);
        });
    });

    setInterval(() => {
        wss.clients.forEach((ws: WebSocket) => {
            const extWs = ws as ExtWebSocket;
            if (!extWs.isAlive) return ws.terminate();
            extWs.isAlive = false;
            ws.ping(null, undefined);
        });
    }, 10000);
}
