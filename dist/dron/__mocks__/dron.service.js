"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DronService = void 0;
const dron_stubs_1 = require("../test/stubs/dron.stubs");
exports.DronService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue((0, dron_stubs_1.dronStub)()),
    findAll: jest.fn().mockResolvedValue([(0, dron_stubs_1.dronStub)()]),
    create: jest.fn().mockResolvedValue((0, dron_stubs_1.dronStub)()),
});
//# sourceMappingURL=dron.service.js.map