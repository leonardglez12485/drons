import { AppService } from './app.service';
import { DronService } from './dron/dron.service';
export declare class AppController {
    private readonly appService;
    private readonly dronService;
    constructor(appService: AppService, dronService: DronService);
    getHello(): string;
    createDronsLogsHistory(): void;
    updateDrone(): void;
}
