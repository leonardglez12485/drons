import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DronService } from './dron.service';
import { CreateDronDto } from './dto/create-dron.dto';
import { UpdateDronDto } from './dto/update-dron.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChargeDronDto } from './dto/charge-dron.dto';
import { AudirDronLogsDTO } from './dto/audit-dronLogs.dto';;

@ApiTags('Drone')
@Controller('dron')
export class DronController {
  constructor(private readonly dronService: DronService) {}

  @Post()
  @ApiResponse({status: 201})
  create(
    @Body() createDronDto: CreateDronDto,
    ){
    return this.dronService.create(createDronDto);
  }

  @Get()
 async findAll(
   // @Query() dto: PaginationDto
  ){
    //return this.dronService.createDronsLogsHistory();
    return await this.dronService.findAll();

  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.dronService.findOne(term);
  }

  @Patch('term')
  update(@Param('term') term: string, @Body() updateDronDto: UpdateDronDto) {
    return this.dronService.update(term, updateDronDto);
  }

  @Delete(':term')
  remove(
    @Param('term') term: string
    ){
    return this.dronService.remove(term);
  }

  @Post('charge-drone')
  chargeDron(
    @Body() dto:ChargeDronDto
    ){
    return this.dronService.chargeDron(dto);
  }

  @Get('charges/:term')
  chargesDrone(@Param('term') term: string) {
    return this.dronService.chargesByDrone(term);
  }

  @Get('availables/drones')
  availablesDrones() {
    return this.dronService.availablesDrones();
  }

  @Get('drone-batery/:term')
  bateryDrone(
    @Param('term') term: string
    ) {
    return this.dronService.bateryByDrone(term);
  }

  @Post('logs-history')
  getChargeStat(
    @Body() dto: AudirDronLogsDTO
    ){
    return this.dronService.auditDronsLogs(dto)
  }
}
