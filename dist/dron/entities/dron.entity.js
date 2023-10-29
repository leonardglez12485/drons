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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DronSchema = exports.Dron = exports.Model = exports.State = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var State;
(function (State) {
    State["IDLE"] = "IDLE";
    State["LOADING"] = "LOADING";
    State["LOADED"] = "LOADED";
    State["DELIVERING"] = "DELIVERING";
    State["DELIVERED"] = "DELIVERED";
    State["RETURNING"] = "RETURNING";
})(State || (exports.State = State = {}));
var Model;
(function (Model) {
    Model["Lightweight"] = "Lightweight";
    Model["Middleweight"] = "Middleweight";
    Model["Cruiserweight"] = "Cruiserweight";
    Model["Heavyweight"] = "Heavyweight";
})(Model || (exports.Model = Model = {}));
let Dron = class Dron {
};
exports.Dron = Dron;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", String)
], Dron.prototype, "serialNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Lightweight' }),
    __metadata("design:type", String)
], Dron.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Dron.prototype, "maxWeight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 100 }),
    __metadata("design:type", Number)
], Dron.prototype, "batery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'LOADED' }),
    __metadata("design:type", String)
], Dron.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Medication' }] }),
    __metadata("design:type", Array)
], Dron.prototype, "charge", void 0);
exports.Dron = Dron = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    })
], Dron);
const DronSchema = mongoose_1.SchemaFactory.createForClass(Dron);
exports.DronSchema = DronSchema;
//# sourceMappingURL=dron.entity.js.map