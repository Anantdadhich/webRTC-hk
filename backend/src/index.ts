/*import { WebSocket, WebSocketServer } from "ws";
//we created the new server 
const wss=new WebSocketServer({port:8080});

let senderSocket:null|WebSocket=null;
let reciverSocket:null|WebSocket=null;


wss.on("connection",function connection(ws){
    ws.on('error',console.error);
   //if you ignore the messgae handlers then it's a simple websocket server 
    ws.on('message',function message(data:any){
        const message=JSON.parse(data);
        //now we add message handlers 
          if(message.type==="sender"){
            senderSocket=ws;
          }else if(message.type==="reciever"){
            reciverSocket=ws;
            //create offer
          }else if(message.type==="createOffer"){
            if(ws !==senderSocket){
                return;
            }
            reciverSocket?.send(JSON.stringify({type:"createOffer",sdp:message.sdp}))
           }//we create answer for reciveing offer
          else if( message.type ==="createAnswer"){
               if(ws !==reciverSocket){
                return;
               }
                senderSocket?.send(JSON.stringify({type:"createAnswer",sdp:message.sdp}))
          }   //ice candia
          else if(message.type ==="IceCandidates"){
            if(ws===senderSocket){
              reciverSocket?.send(JSON.stringify({type:"IceCandidates",candidate:message.candidate}))
            }else if( ws ===reciverSocket){
                senderSocket?.send(JSON.stringify({type:"IceCandidates",candidate:message.candidate}))
            }
          }
         
    })

    ws.send('something send')
});


*/

import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    const message = JSON.parse(data);
    if (message.type === 'sender') {
      senderSocket = ws;
    } else if (message.type === 'receiver') {
      receiverSocket = ws;
    } else if (message.type === 'createOffer') {
      if (ws !== senderSocket) {
        return;
      }
      receiverSocket?.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
    } else if (message.type === 'createAnswer') {
        if (ws !== receiverSocket) {
          return;
        }
        senderSocket?.send(JSON.stringify({ type: 'createAnswer', sdp: message.sdp }));
    } else if (message.type === 'iceCandidate') {
      if (ws === senderSocket) {
        receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      } else if (ws === receiverSocket) {
        senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      }
    }
  });
});