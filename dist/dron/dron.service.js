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
exports.DronService = void 0;
const common_1 = require("@nestjs/common");
const dron_entity_1 = require("./entities/dron.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const medication_entity_1 = require("../medication/entities/medication.entity");
const dron_logs_entity_1 = require("./entities/dron-logs.entity");
3;
const helpers_1 = require("../common/helpers");
let DronService = class DronService {
    constructor(dronModel, medModel, logModel) {
        this.dronModel = dronModel;
        this.medModel = medModel;
        this.logModel = logModel;
    }
    async create(dto) {
        dto.serialNumber = dto.serialNumber.toLowerCase();
        if (await this.itsDron(dto.serialNumber))
            throw new common_1.BadRequestException('This Dron alredy exist !!!');
        try {
            const dron = await this.dronModel.create(dto);
            return dron;
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async findAll() {
        return await this.dronModel.find();
    }
    async findOne(term) {
        let dron;
        if (!dron && (0, mongoose_1.isValidObjectId)(term)) {
            dron = await this.dronModel.findById(term);
        }
        if (!dron) {
            dron = await this.dronModel.findOne({ serialNumber: term });
        }
        if (!dron)
            throw new common_1.NotFoundException(`The Dron ${term} doesn't exist !!!`);
        return dron;
    }
    async update(term, dto) {
        const dron = await this.findOne(term);
        try {
            await this.dronModel.findOneAndUpdate({ serialNumber: dron.serialNumber }, dto);
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async remove(term) {
        const dron = await this.findOne(term);
        try {
            await this.dronModel.findOneAndDelete({ serialNumber: dron.serialNumber });
        }
        catch (error) {
            this.handleException(error);
        }
    }
    calculateWeight(drone) {
        let chargeW = 0;
        drone.charge.map((d) => {
            chargeW += d.weight;
        });
        console.log(Number(chargeW));
        return chargeW;
    }
    async chargeDron(dto) {
        const med = await this.medModel.findOne({ names: dto.medication });
        const drone = await this.dronModel.findOne({ serialNumber: dto.drone })
            .populate({
            path: 'charge'
        });
        if (!med)
            throw new common_1.NotFoundException(`Medication ${dto.medication} doesn't exist in DB`);
        if (!drone)
            throw new common_1.NotFoundException(`Drone ${dto.drone} doesn't exist in DB`);
        if (drone.batery < 25)
            throw new common_1.BadRequestException('Batery low !!!');
        if (drone.state === dron_entity_1.State.DELIVERED || drone.state === dron_entity_1.State.DELIVERING || drone.state === dron_entity_1.State.RETURNING)
            throw new common_1.BadRequestException('State must be IDLE or LOADING');
        if ((await this.calculateWeight(drone) + med.weight) > drone.maxWeight)
            throw new common_1.BadRequestException('Weight limit exceeded');
        drone.charge.push(med);
        drone.state = dron_entity_1.State.LOADED;
        const value = await this.dronModel.findOneAndUpdate({ serialNumber: drone.serialNumber }, drone);
        return value;
    }
    async chargesByDrone(term) {
        let dron;
        dron = await this.dronModel.findOne({ serialNumber: term })
            .populate({
            path: 'charge'
        });
        if (!dron)
            throw new common_1.NotFoundException(`The Dron ${term} doesn't exist !!!`);
        let charges = [];
        dron.charge.map((d) => {
            charges.push(d.names);
        });
        return charges;
    }
    async availablesDrones() {
        const droneFilter = {};
        droneFilter['state'] = [dron_entity_1.State.IDLE, dron_entity_1.State.LOADING];
        droneFilter['batery'] = { $gte: 25 };
        const drone = await this.dronModel.find(droneFilter);
        return drone;
    }
    async bateryByDrone(term) {
        let dron;
        dron = await this.dronModel.findOne({ serialNumber: term });
        if (!dron)
            throw new common_1.NotFoundException(`The Dron ${term} doesn't exist !!!`);
        return dron.batery;
    }
    async createDronsLogsHistory() {
        const date = new Date();
        const drones = await this.dronModel.find();
        const data = {};
        data['Reporte'] = {};
        data['Reporte'][date] = {};
        data['Reporte'][date]['Drone'] = {};
        drones.map((d) => {
            data['Reporte'][date]['Drone'][d.serialNumber] = {};
            data['Reporte'][date]['Drone'][d.serialNumber]['Batery'] = {};
            data['Reporte'][date]['Drone'][d.serialNumber]['Batery'] = d.batery;
        });
        const log = {
            date,
            data
        };
        const logHistory = await this.logModel.create(log);
        return logHistory;
    }
    async updateDrone() {
        const drones = await this.dronModel.find();
        drones.map(async (d) => {
            if (d.batery < 25) {
                d.state = dron_entity_1.State.IDLE;
                await this.dronModel.findOneAndUpdate({ serialNumber: d.serialNumber }, d);
            }
        });
    }
    async auditDronsLogs(dto) {
        const { startDate, endDate } = dto;
        const dateField = 'date';
        const { start, end } = (0, helpers_1.dateRangeByCustomDates)(startDate, endDate);
        const filter = {};
        if (start && end)
            filter[dateField] = { $gte: new Date(start), $lte: new Date(end) };
        console.log(startDate, endDate);
        const total = await this.logModel.find(filter).countDocuments();
        const items = await this.logModel.find(filter);
        return {
            total,
            items
        };
    }
    async itsDron(data) {
        const dron = await this.dronModel.findOne({ serialNumber: data });
        if (dron)
            return true;
        return false;
    }
    handleException(error) {
        if (error.code === 11000) {
            throw new common_1.BadRequestException(`Dron exists in DB ${JSON.stringify(error.keyValue)}`);
        }
        console.log({ error });
        throw new common_1.InternalServerErrorException(`Can't create Drons - Check server logs `);
    }
};
exports.DronService = DronService;
exports.DronService = DronService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(dron_entity_1.Dron.name)),
    __param(1, (0, mongoose_2.InjectModel)(medication_entity_1.Medication.name)),
    __param(2, (0, mongoose_2.InjectModel)(dron_logs_entity_1.DronLogsHistory.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], DronService);
//# sourceMappingURL=dron.service.js.map