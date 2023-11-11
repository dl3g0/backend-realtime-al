"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    afterInit(server) {
        console.log('Esto se ejecuta cuando inicia');
    }
    handleConnection(client, ...args) {
        console.log('Hola alguien se conecto al socket');
    }
    handleDisconnect(client) {
        console.log('ALguien se fue');
    }
    handleJoinRoom(client, room) {
        console.log(`te conectaste a la sala "${room}" `);
        client.join(`room_${room}`);
    }
    handleIncommingMessage(client, payload) {
        const { room, message } = payload;
        console.log(payload, "remitente");
        this.server.to(`room_${room}`).emit('new_message', payload);
    }
    handleRoomLeave(client, room) {
        console.log(`te desconectaste de la sala`);
        client.leave(`room_${room}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('event_join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('event_message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleIncommingMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('event_leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRoomLeave", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(80, {
        cors: { origin: '*' },
    })
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map