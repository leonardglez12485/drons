"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dronStub = void 0;
const dron_entity_1 = require("../../entities/dron.entity");
const dronStub = () => {
    return {
        serialNumber: 'KM-45',
        model: dron_entity_1.Model.Cruiserweight,
        maxWeight: 500,
        batery: 100,
        state: dron_entity_1.State.LOADING,
        charge: []
    };
};
exports.dronStub = dronStub;
//# sourceMappingURL=dron.stubs.js.map