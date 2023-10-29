import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication, MedicationDocument } from './entities/medication.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';


@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(Medication.name) private readonly medicationModel: Model<MedicationDocument>,
  ) { }

  async create(dto: CreateMedicationDto, file: string) {
    dto.names = dto.names.toLowerCase();
    dto.code = dto.code.toUpperCase();
    dto.picture = file;
    if (await this.itsMedication(dto.names)) throw new BadRequestException('This Medication exist !!!');
    try {
      
      const medication = await this.medicationModel.create(dto);
      return medication;
    } catch (error) {
      this.handleException(error);
    }
  }

 async  findAll() {
   // const { limit = 10, offset = 0 } = dto;
    return await this.medicationModel.find()
      // .limit(limit)
      // .skip(offset)
      // .select('-__v')
  }

  async findOne(term: string): Promise<Medication> {
    let medication: Medication;
   
    //search by ID
    if(!medication && isValidObjectId(term)) {
      medication = await this.medicationModel.findById(term)
    }

    //search by Name
    if(!medication) {
      medication = await this.medicationModel.findOne({names:term})
    }

    //search by Name
    if(!medication) {
      medication = await this.medicationModel.findOne({code:term})
    }

    if(!medication) throw new NotFoundException(`The Medication ${term} doesn't exist !!!`)

  
   return medication;

  }
  async findImage(term: string, res: Response){
    const med = await this.findOne(term);
    return res.sendFile(this.getStaticProductImage(med.picture));
  }

  async update(term: string, dto: UpdateMedicationDto) {
    const medication = await this.findOne(term);
    try {
     await this.medicationModel.findOneAndUpdate({names: medication.names}, dto);
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(term: string) {
    const medication = await this.findOne(term);
    try {
     await this.medicationModel.findOneAndDelete({names: medication.names});
    } catch (error) {
      this.handleException(error);
    }
  }

  //==========================
  //Check if exist Medication
  //==========================
  async itsMedication(name: string) {
    const med = await this.medicationModel.findOne({ name });
    if(med)return true
    return false;
  }

   getStaticProductImage(imageName:string){
    const path= join(__dirname, '../../static/medications', imageName)
    if(!existsSync(path)) throw new BadRequestException('No image for this midecation !!!!')
    return path;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Medication exists in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log({ error });
    throw new InternalServerErrorException(`Can't create Medication - Check server logs `);
  }
}
