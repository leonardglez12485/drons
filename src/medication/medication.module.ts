import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medication, MedicationSchema } from './entities/medication.entity';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Module({
  controllers: [MedicationController],
  providers: [MedicationService, ConfigService],
  imports:[
    MongooseModule.forFeature([
      {
       name: Medication.name,
       schema: MedicationSchema,
      }
    ]),
  ],
  exports: [MedicationModule]
})
export class MedicationModule {}
