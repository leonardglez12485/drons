"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const socket_client_1 = require("./messages-ws/socket-client");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const log = new common_1.Logger('Bootstrap');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API Drone')
        .setVersion('1.0')
        .addTag('Drone')
        .addApiKey({ type: 'apiKey', name: 'Drons', in: 'header' }, 'Api-Key')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
    (0, socket_client_1.conectToServer)();
    log.log(`App Running at Port ${process.env.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map