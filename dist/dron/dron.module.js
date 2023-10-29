"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DronModule = void 0;
const common_1 = require("@nestjs/common");
const dron_service_1 = require("./dron.service");
const dron_controller_1 = require("./dron.controller");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const dron_entity_1 = require("./entities/dron.entity");
const medication_module_1 = require("../medication/medication.module");
const medication_service_1 = require("../medication/medication.service");
const medication_entity_1 = require("../medication/entities/medication.entity");
const dron_logs_entity_1 = require("./entities/dron-logs.entity");
let DronModule = class DronModule {
};
exports.DronModule = DronModule;
exports.DronModule = DronModule = __decorate([
    (0, common_1.Module)({
        controllers: [dron_controller_1.DronController],
        providers: [dron_service_1.DronService, config_1.ConfigService, medication_service_1.MedicationService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: dron_entity_1.Dron.name, schema: dron_entity_1.DronSchema },
                { name: medication_entity_1.Medication.name, schema: medication_entity_1.MedicationSchema },
                { name: dron_logs_entity_1.DronLogsHistory.name, schema: dron_logs_entity_1.DronLogsHistorySchema }
            ]),
            DronModule,
            medication_module_1.MedicationModule
        ],
        exports: []
    })
], DronModule);
//# sourceMappingURL=dron.module.js.map