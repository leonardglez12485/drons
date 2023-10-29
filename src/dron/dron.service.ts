import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, ParseFilePipe } from '@nestjs/common';
import { CreateDronDto } from './dto/create-dron.dto';
import { UpdateDronDto } from './dto/update-dron.dto';
import { Dron, DronDocument, State } from './entities/dron.entity';
import { Model, STATES, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Medication, MedicationDocument } from 'src/medication/entities/medication.entity';
import { ChargeDronDto } from './dto/charge-dron.dto';
import { DronLogsHistory, DronLogsHistoryDocument } from './entities/dron-logs.entity';
import { AudirDronLogsDTO } from './dto/audit-dronLogs.dto';3
import { dateRangeByCustomDates } from 'src/common/helpers';
import { ifError } from 'assert';



@Injectable()
export class DronService {
  constructor(
    @InjectModel(Dron.name) private readonly dronModel: Model<DronDocument>,
    @InjectModel(Medication.name) private readonly medModel: Model<MedicationDocument>,
    @InjectModel(DronLogsHistory.name) private readonly logModel: Model<DronLogsHistoryDocument>,
    ) { }

  async create(
    dto: CreateDronDto
  ) {
    dto.serialNumber = dto.serialNumber.toLowerCase();
    if (await this.itsDron(dto.serialNumber)) throw new BadRequestException('This Dron alredy exist !!!');
    try {
      const dron = await this.dronModel.create(dto);
      return dron;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(

  ) {
   // const { limit = 10, offset = 0 } = dto;
    return await this.dronModel.find()
      // .limit(limit)
      // .skip(offset)
      // .select('-__v')
  }

  async findOne(
    term: string
  ) {
    let dron: Dron;
    //search by ID
    if (!dron && isValidObjectId(term)) {
      dron = await this.dronModel.findById(term)
    }
    //Search by Serial Number
    if (!dron) {
      dron = await this.dronModel.findOne({ serialNumber: term })
    }
    if (!dron) throw new NotFoundException(`The Dron ${term} doesn't exist !!!`)

    return dron;
  }

  async update(
    term: string, dto: UpdateDronDto
  ) {
    const dron = await this.findOne(term);
    try {
      await this.dronModel.findOneAndUpdate({ serialNumber: dron.serialNumber }, dto);
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(
    term: string
  ) {
    const dron = await this.findOne(term);
    try {
      await this.dronModel.findOneAndDelete({ serialNumber: dron.serialNumber });
    } catch (error) {
      this.handleException(error);
    }
  }

  private calculateWeight(
    drone: Dron
  ) {
    let chargeW = 0;
    drone.charge.map((d) => {
      chargeW += d.weight;
    })
    console.log(Number(chargeW))
    return chargeW;
  }

  //===========================
  //This Service Charge a Drone
  //===========================
  async chargeDron(
    dto: ChargeDronDto
  ): Promise<any> {
    const med: Medication = await this.medModel.findOne({ names: dto.medication });
    const drone: Dron = await this.dronModel.findOne({ serialNumber: dto.drone })
      .populate({
        path: 'charge'
      });
    if (!med) throw new NotFoundException(`Medication ${dto.medication} doesn't exist in DB`);
    if (!drone) throw new NotFoundException(`Drone ${dto.drone} doesn't exist in DB`);
    if(drone.batery<25) throw new BadRequestException('Batery low !!!');
    if(drone.state === State.DELIVERED ||drone.state === State.DELIVERING|| drone.state === State.RETURNING) throw new BadRequestException('State must be IDLE or LOADING')
    if ((await this.calculateWeight(drone) + med.weight) > drone.maxWeight) throw new BadRequestException('Weight limit exceeded')

    drone.charge.push(med);
    drone.state=State.LOADED;
    const value = await this.dronModel.findOneAndUpdate({ serialNumber: drone.serialNumber }, drone);

    return value;

  }

  //====================================
  //This Service check the drone charges 
  //====================================
  async chargesByDrone(
    term: string
  ): Promise<any> {
    let dron: Dron;
    //Search by Serial Number
    dron = await this.dronModel.findOne({ serialNumber: term })
      .populate({
        path: 'charge'
      });
    if (!dron) throw new NotFoundException(`The Dron ${term} doesn't exist !!!`)
    let charges = [];
    dron.charge.map((d) => {
      charges.push(d.names)
    })

    return charges;
  }

  //==================================================
  //This Service show the available drones for loading  
  //==================================================
  async availablesDrones(
  ): Promise<any> {
    const droneFilter = {};
    droneFilter['state'] = [State.IDLE, State.LOADING];
    droneFilter['batery'] = { $gte: 25 };
    const drone = await this.dronModel.find(droneFilter);
   return drone;
    
  }

  //====================================
  //This Service check the drone batery 
  //====================================
  async bateryByDrone(
    term: string
  ): Promise<any> {
    let dron: Dron;
    //Search by Serial Number
    dron = await this.dronModel.findOne({ serialNumber: term })
    if (!dron) throw new NotFoundException(`The Dron ${term} doesn't exist !!!`)

    return dron.batery;
  }

  //==================================
  //This Service creates a events logs
  //==================================

  async createDronsLogsHistory(){
    const date = new Date();
    const drones = await this.dronModel.find();
    const data = {};
    data['Reporte']={};
    data['Reporte'][date]={};
    data['Reporte'][date]['Drone']= {};
    drones.map((d)=>{
      data['Reporte'][date]['Drone'][d.serialNumber]= {};
      data['Reporte'][date]['Drone'][d.serialNumber]['Batery']= {};
      data['Reporte'][date]['Drone'][d.serialNumber]['Batery']= d.batery;
    })
    const log:DronLogsHistory={
       date,
       data
    }
    const logHistory = await this.logModel.create(log);
    return logHistory;
  }

  //==================================
  //This Service creates a events logs
  //==================================
  async updateDrone(){
    const drones = await this.dronModel.find();
    drones.map(async (d)=>{
      if(d.batery< 25 ){
        d.state = State.IDLE;
        await this.dronModel.findOneAndUpdate({ serialNumber: d.serialNumber }, d); 
      }
    })  
  }

  //==========================
  //Audit an Events Log
  //==========================
  async auditDronsLogs(dto: AudirDronLogsDTO){
    const { startDate, endDate} = dto;
    const dateField = 'date';
    const { start, end } = dateRangeByCustomDates(startDate, endDate);
    const filter = {};
    if (start && end)
      filter[dateField] = { $gte: new Date(start), $lte: new Date(end) };
    // if (startDate) filter['startDate'] = { $gte: startOfDay(new Date(startDate)) };
    // if (endDate) filter['endDate'] = { $lte: endOfDay(new Date(endDate)) };
    console.log(startDate, endDate)

    const total = await this.logModel.find(filter).countDocuments();
    const items = await this.logModel.find(filter)
      // .skip(offset)
      // .limit(limit)
      // .exec();

    return {
      total,
      items
    };
  }
   

  //==========================
  //Check if exist Dron
  //==========================
  async itsDron(data: string) {
    const dron = await this.dronModel.findOne({ serialNumber: data });
    if (dron) return true
    return false;
  }



  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Dron exists in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log({ error });
    throw new InternalServerErrorException(`Can't create Drons - Check server logs `);
  }
}
