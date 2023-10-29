import { Model, State } from "../entities/dron.entity";
import { Medication } from "src/medication/entities/medication.entity";
export declare class CreateDronDto {
    serialNumber: string;
    model: Model;
    maxWeight: number;
    batery: number;
    state: State;
    charge?: Medication[];
}
