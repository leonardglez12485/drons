import mongoose, { HydratedDocument } from "mongoose";
export type DronLogsHistoryDocument = HydratedDocument<DronLogsHistory>;
export declare class DronLogsHistory {
    date: Date;
    data: object;
}
declare const DronLogsHistorySchema: mongoose.Schema<DronLogsHistory, mongoose.Model<DronLogsHistory, any, any, any, mongoose.Document<unknown, any, DronLogsHistory> & DronLogsHistory & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DronLogsHistory, mongoose.Document<unknown, {}, mongoose.FlatRecord<DronLogsHistory>> & mongoose.FlatRecord<DronLogsHistory> & {
    _id: mongoose.Types.ObjectId;
}>;
export { DronLogsHistorySchema };
