import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { log } from 'console';
import { AppService } from 'src/app.service';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messagesWsService: MessagesWsService
    ) {
  
    }

  private readonly log = new Logger(AppService.name);
  handleConnection(client: Socket) {
   this.log.log('User Conected...')
  // console.log('Usuario conectado', client.id)

  }

  handleDisconnect(client: Socket) {
    this.log.log('User Desconected......')
}

}
