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
exports.MedicationController = void 0;
const common_1 = require("@nestjs/common");
const medication_service_1 = require("./medication.service");
const create_medication_dto_1 = require("./dto/create-medication.dto");
const update_medication_dto_1 = require("./dto/update-medication.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const index_1 = require("../common/helpers/index");
let MedicationController = class MedicationController {
    constructor(medicationService) {
        this.medicationService = medicationService;
    }
    async create(dto, file) {
        if (!dto.picture) {
            return;
        }
        dto.picture = file.filename;
        return this.medicationService.create(dto, file.filename);
    }
    async findAll() {
        return await this.medicationService.findAll();
    }
    async findOne(term) {
        return await this.medicationService.findOne(term);
    }
    async findImage(term, res) {
        return this.medicationService.findImage(term, res);
    }
    update(term, dto) {
        return this.medicationService.update(term, dto);
    }
    remove(term) {
        return this.medicationService.remove(term);
    }
};
exports.MedicationController = MedicationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture', {
        fileFilter: index_1.fileFilter,
        limits: { fileSize: 1e6 },
        storage: (0, multer_1.diskStorage)({
            destination: './static/medications',
            filename: index_1.fileNamer,
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medication_dto_1.CreateMedicationDto, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('img/:term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "findImage", null);
__decorate([
    (0, common_1.Patch)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medication_dto_1.UpdateMedicationDto]),
    __metadata("design:returntype", void 0)
], MedicationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicationController.prototype, "remove", null);
exports.MedicationController = MedicationController = __decorate([
    (0, swagger_1.ApiTags)('Medication'),
    (0, common_1.Controller)('medication'),
    __metadata("design:paramtypes", [medication_service_1.MedicationService])
], MedicationController);
//# sourceMappingURL=medication.controller.js.map