import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, {
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('Esto se ejecuta cuando inicia')
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conecto al socket');
  }

  handleDisconnect(client: any) {
    console.log('ALguien se fue')
  }

  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    console.log(`te conectaste a la sala "${room}" `)
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message') //TODO Backend
  handleIncommingMessage(client: Socket, payload: { room: string; message: string }) {
    const { room, message } = payload;
    console.log(payload ,"remitente")
    this.server.to(`room_${room}`).emit('new_message',payload);
  }

  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room:string) {
    console.log(`te desconectaste de la sala`)
    client.leave(`room_${room}`);
  }
}
