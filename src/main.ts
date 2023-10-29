import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { conectToServer } from './messages-ws/socket-client';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const log = new Logger('Bootstrap');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Drone')
    .setVersion('1.0')
    .addTag('Drone')
    .addApiKey({type: 'apiKey', name: 'Drons', in: 'header'}, 'Api-Key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
  conectToServer();
  log.log(`App Running at Port ${process.env.PORT}`)

}
bootstrap();
