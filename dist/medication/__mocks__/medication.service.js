"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationService = void 0;
const medication_stubs_1 = require("../test/stubs/medication.stubs");
exports.MedicationService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue((0, medication_stubs_1.medStub)()),
    findAll: jest.fn().mockResolvedValue([(0, medication_stubs_1.medStub)()]),
    create: jest.fn().mockResolvedValue((0, medication_stubs_1.medStub)())
});
//# sourceMappingURL=medication.service.js.map