"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const dron_module_1 = require("./dron/dron.module");
const medication_module_1 = require("./medication/medication.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_config_1 = require("./config/app.config");
const joi_validation_1 = require("./config/joi.validation");
const messages_ws_module_1 = require("./messages-ws/messages-ws.module");
const schedule_1 = require("@nestjs/schedule");
const dron_service_1 = require("./dron/dron.service");
const dron_entity_1 = require("./dron/entities/dron.entity");
const dron_logs_entity_1 = require("./dron/entities/dron-logs.entity");
const medication_entity_1 = require("./medication/entities/medication.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.envConfiguration],
                validationSchema: joi_validation_1.JoiValidationSchema
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB, {
                dbName: 'nest-dron',
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: dron_entity_1.Dron.name, schema: dron_entity_1.DronSchema },
                { name: medication_entity_1.Medication.name, schema: medication_entity_1.MedicationSchema },
                { name: dron_logs_entity_1.DronLogsHistory.name, schema: dron_logs_entity_1.DronLogsHistorySchema }
            ]),
            dron_module_1.DronModule,
            medication_module_1.MedicationModule,
            messages_ws_module_1.MessagesWsModule,
            schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, dron_service_1.DronService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map