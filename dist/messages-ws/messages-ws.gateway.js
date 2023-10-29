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
exports.MessagesWsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_ws_service_1 = require("./messages-ws.service");
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let MessagesWsGateway = class MessagesWsGateway {
    constructor(messagesWsService) {
        this.messagesWsService = messagesWsService;
        this.log = new common_1.Logger(app_service_1.AppService.name);
    }
    handleConnection(client) {
        this.log.log('User Conected...');
    }
    handleDisconnect(client) {
        this.log.log('User Desconected......');
    }
};
exports.MessagesWsGateway = MessagesWsGateway;
exports.MessagesWsGateway = MessagesWsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [messages_ws_service_1.MessagesWsService])
], MessagesWsGateway);
//# sourceMappingURL=messages-ws.gateway.js.map