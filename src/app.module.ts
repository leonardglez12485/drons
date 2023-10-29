import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronModule } from './dron/dron.module';
import { MedicationModule } from './medication/medication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { envConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DronService } from './dron/dron.service';
import { Dron, DronSchema } from './dron/entities/dron.entity';
import { DronLogsHistory, DronLogsHistorySchema } from './dron/entities/dron-logs.entity';
import { Medication, MedicationSchema } from './medication/entities/medication.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfiguration],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'nest-dron',
    }),
    MongooseModule.forFeature([
      {name: Dron.name, schema: DronSchema},
      {name: Medication.name, schema: MedicationSchema},
      {name: DronLogsHistory.name, schema: DronLogsHistorySchema}
      
    ]),
    DronModule, 
    MedicationModule,
    MessagesWsModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, DronService],
})
export class AppModule {}
