import { Module } from '@nestjs/common';
import { DronService } from './dron.service';
import { DronController } from './dron.controller';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Dron, DronSchema } from './entities/dron.entity';
import { MedicationModule } from 'src/medication/medication.module';
import { MedicationService } from 'src/medication/medication.service';
import { Medication, MedicationSchema } from '../medication/entities/medication.entity';
import { DronLogsHistory, DronLogsHistorySchema } from './entities/dron-logs.entity';

@Module({
  controllers: [DronController],
  providers: [DronService, ConfigService, MedicationService],
  imports:[
    MongooseModule.forFeature([
      {name: Dron.name, schema: DronSchema},
      {name: Medication.name, schema: MedicationSchema},
      {name: DronLogsHistory.name, schema: DronLogsHistorySchema}
      
    ]),
    DronModule,
    MedicationModule
  ],
  exports:[

  ]
})
export class DronModule {}
