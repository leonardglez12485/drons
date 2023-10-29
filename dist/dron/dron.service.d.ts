/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateDronDto } from './dto/create-dron.dto';
import { UpdateDronDto } from './dto/update-dron.dto';
import { Dron, DronDocument } from './entities/dron.entity';
import { Model } from 'mongoose';
import { MedicationDocument } from 'src/medication/entities/medication.entity';
import { ChargeDronDto } from './dto/charge-dron.dto';
import { DronLogsHistory, DronLogsHistoryDocument } from './entities/dron-logs.entity';
import { AudirDronLogsDTO } from './dto/audit-dronLogs.dto';
export declare class DronService {
    private readonly dronModel;
    private readonly medModel;
    private readonly logModel;
    constructor(dronModel: Model<DronDocument>, medModel: Model<MedicationDocument>, logModel: Model<DronLogsHistoryDocument>);
    create(dto: CreateDronDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Dron> & Dron & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Dron> & Dron & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Dron> & Dron & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Dron> & Dron & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(term: string): Promise<Dron>;
    update(term: string, dto: UpdateDronDto): Promise<void>;
    remove(term: string): Promise<void>;
    private calculateWeight;
    chargeDron(dto: ChargeDronDto): Promise<any>;
    chargesByDrone(term: string): Promise<any>;
    availablesDrones(): Promise<any>;
    bateryByDrone(term: string): Promise<any>;
    createDronsLogsHistory(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, DronLogsHistory> & DronLogsHistory & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, DronLogsHistory> & DronLogsHistory & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateDrone(): Promise<void>;
    auditDronsLogs(dto: AudirDronLogsDTO): Promise<{
        total: number;
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, DronLogsHistory> & DronLogsHistory & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, DronLogsHistory> & DronLogsHistory & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    itsDron(data: string): Promise<boolean>;
    private handleException;
}
