"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfiguration = void 0;
const envConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    poprt: process.env.PORT || 3002,
    default_limits: +process.env.DEFAULT_LIMIT || 10,
});
exports.envConfiguration = envConfiguration;
//# sourceMappingURL=app.config.js.map