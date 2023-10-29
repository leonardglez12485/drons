import mongoose, { HydratedDocument } from "mongoose";
import { Medication } from "src/medication/entities/medication.entity";
export declare enum State {
    IDLE = "IDLE",
    LOADING = "LOADING",
    LOADED = "LOADED",
    DELIVERING = "DELIVERING",
    DELIVERED = "DELIVERED",
    RETURNING = "RETURNING"
}
export declare enum Model {
    Lightweight = "Lightweight",
    Middleweight = "Middleweight",
    Cruiserweight = "Cruiserweight",
    Heavyweight = "Heavyweight"
}
export type DronDocument = HydratedDocument<Dron>;
export declare class Dron {
    serialNumber: string;
    model: Model;
    maxWeight: number;
    batery: number;
    state: State;
    charge?: Medication[];
}
declare const DronSchema: mongoose.Schema<Dron, mongoose.Model<Dron, any, any, any, mongoose.Document<unknown, any, Dron> & Dron & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Dron, mongoose.Document<unknown, {}, mongoose.FlatRecord<Dron>> & mongoose.FlatRecord<Dron> & {
    _id: mongoose.Types.ObjectId;
}>;
export { DronSchema };
