"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DronController = void 0;
const common_1 = require("@nestjs/common");
const dron_service_1 = require("./dron.service");
const create_dron_dto_1 = require("./dto/create-dron.dto");
const update_dron_dto_1 = require("./dto/update-dron.dto");
const swagger_1 = require("@nestjs/swagger");
const charge_dron_dto_1 = require("./dto/charge-dron.dto");
const audit_dronLogs_dto_1 = require("./dto/audit-dronLogs.dto");
;
let DronController = class DronController {
    constructor(dronService) {
        this.dronService = dronService;
    }
    create(createDronDto) {
        return this.dronService.create(createDronDto);
    }
    async findAll() {
        return await this.dronService.findAll();
    }
    findOne(term) {
        return this.dronService.findOne(term);
    }
    update(term, updateDronDto) {
        return this.dronService.update(term, updateDronDto);
    }
    remove(term) {
        return this.dronService.remove(term);
    }
    chargeDron(dto) {
        return this.dronService.chargeDron(dto);
    }
    chargesDrone(term) {
        return this.dronService.chargesByDrone(term);
    }
    availablesDrones() {
        return this.dronService.availablesDrones();
    }
    bateryDrone(term) {
        return this.dronService.bateryByDrone(term);
    }
    getChargeStat(dto) {
        return this.dronService.auditDronsLogs(dto);
    }
};
exports.DronController = DronController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dron_dto_1.CreateDronDto]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DronController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dron_dto_1.UpdateDronDto]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('charge-drone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charge_dron_dto_1.ChargeDronDto]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "chargeDron", null);
__decorate([
    (0, common_1.Get)('charges/:term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "chargesDrone", null);
__decorate([
    (0, common_1.Get)('availables/drones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DronController.prototype, "availablesDrones", null);
__decorate([
    (0, common_1.Get)('drone-batery/:term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "bateryDrone", null);
__decorate([
    (0, common_1.Post)('logs-history'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [audit_dronLogs_dto_1.AudirDronLogsDTO]),
    __metadata("design:returntype", void 0)
], DronController.prototype, "getChargeStat", null);
exports.DronController = DronController = __decorate([
    (0, swagger_1.ApiTags)('Drone'),
    (0, common_1.Controller)('dron'),
    __metadata("design:paramtypes", [dron_service_1.DronService])
], DronController);
//# sourceMappingURL=dron.controller.js.map