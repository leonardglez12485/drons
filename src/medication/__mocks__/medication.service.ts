import { medStub } from "../test/stubs/medication.stubs";

export const MedicationService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(medStub()),
    findAll: jest.fn().mockResolvedValue([medStub()]),
    create: jest.fn().mockResolvedValue(medStub())
});