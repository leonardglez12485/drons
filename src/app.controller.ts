import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DronService } from './dron/dron.service';
import { Cron, CronExpression } from '@nestjs/schedule';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dronService: DronService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
   createDronsLogsHistory() {
    this.dronService.createDronsLogsHistory();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  updateDrone() {
   this.dronService.updateDrone();
 }
}

