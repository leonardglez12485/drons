"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectToServer = void 0;
const socket_io_client_1 = require("socket.io-client");
const conectToServer = () => {
    const manager = new socket_io_client_1.Manager('http://localhost:3005/socket.io/socket.io.js');
    const socket = manager.socket('/');
};
exports.conectToServer = conectToServer;
//# sourceMappingURL=socket-client.js.map