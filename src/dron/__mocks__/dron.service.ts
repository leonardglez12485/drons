import { dronStub } from "../test/stubs/dron.stubs";


export const DronService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(dronStub()),
    findAll: jest.fn().mockResolvedValue([dronStub()]),
    create: jest.fn().mockResolvedValue(dronStub())
});