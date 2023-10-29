import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';
export declare class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesWsService;
    constructor(messagesWsService: MessagesWsService);
    private readonly log;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
