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
exports.MedicationService = void 0;
const common_1 = require("@nestjs/common");
const medication_entity_1 = require("./entities/medication.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
const fs_1 = require("fs");
let MedicationService = class MedicationService {
    constructor(medicationModel) {
        this.medicationModel = medicationModel;
    }
    async create(dto, file) {
        dto.names = dto.names.toLowerCase();
        dto.code = dto.code.toUpperCase();
        dto.picture = file;
        if (await this.itsMedication(dto.names))
            throw new common_1.BadRequestException('This Medication exist !!!');
        try {
            const medication = await this.medicationModel.create(dto);
            return medication;
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async findAll() {
        return await this.medicationModel.find();
    }
    async findOne(term) {
        let medication;
        if (!medication && (0, mongoose_2.isValidObjectId)(term)) {
            medication = await this.medicationModel.findById(term);
        }
        if (!medication) {
            medication = await this.medicationModel.findOne({ names: term });
        }
        if (!medication) {
            medication = await this.medicationModel.findOne({ code: term });
        }
        if (!medication)
            throw new common_1.NotFoundException(`The Medication ${term} doesn't exist !!!`);
        return medication;
    }
    async findImage(term, res) {
        const med = await this.findOne(term);
        return res.sendFile(this.getStaticProductImage(med.picture));
    }
    async update(term, dto) {
        const medication = await this.findOne(term);
        try {
            await this.medicationModel.findOneAndUpdate({ names: medication.names }, dto);
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async remove(term) {
        const medication = await this.findOne(term);
        try {
            await this.medicationModel.findOneAndDelete({ names: medication.names });
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async itsMedication(name) {
        const med = await this.medicationModel.findOne({ name });
        if (med)
            return true;
        return false;
    }
    getStaticProductImage(imageName) {
        const path = (0, path_1.join)(__dirname, '../../static/medications', imageName);
        if (!(0, fs_1.existsSync)(path))
            throw new common_1.BadRequestException('No image for this midecation !!!!');
        return path;
    }
    handleException(error) {
        if (error.code === 11000) {
            throw new common_1.BadRequestException(`Medication exists in DB ${JSON.stringify(error.keyValue)}`);
        }
        console.log({ error });
        throw new common_1.InternalServerErrorException(`Can't create Medication - Check server logs `);
    }
};
exports.MedicationService = MedicationService;
exports.MedicationService = MedicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medication_entity_1.Medication.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MedicationService);
//# sourceMappingURL=medication.service.js.map