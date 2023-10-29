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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { DronService } from './dron.service';
import { CreateDronDto } from './dto/create-dron.dto';
import { UpdateDronDto } from './dto/update-dron.dto';
import { ChargeDronDto } from './dto/charge-dron.dto';
import { AudirDronLogsDTO } from './dto/audit-dronLogs.dto';
export declare class DronController {
    private readonly dronService;
    constructor(dronService: DronService);
    create(createDronDto: CreateDronDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/dron.entity").Dron> & import("./entities/dron.entity").Dron & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./entities/dron.entity").Dron> & import("./entities/dron.entity").Dron & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/dron.entity").Dron> & import("./entities/dron.entity").Dron & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./entities/dron.entity").Dron> & import("./entities/dron.entity").Dron & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(term: string): Promise<import("./entities/dron.entity").Dron>;
    update(term: string, updateDronDto: UpdateDronDto): Promise<void>;
    remove(term: string): Promise<void>;
    chargeDron(dto: ChargeDronDto): Promise<any>;
    chargesDrone(term: string): Promise<any>;
    availablesDrones(): Promise<any>;
    bateryDrone(term: string): Promise<any>;
    getChargeStat(dto: AudirDronLogsDTO): Promise<{
        total: number;
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/dron-logs.entity").DronLogsHistory> & import("./entities/dron-logs.entity").DronLogsHistory & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./entities/dron-logs.entity").DronLogsHistory> & import("./entities/dron-logs.entity").DronLogsHistory & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
}
