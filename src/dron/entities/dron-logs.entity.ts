import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, SchemaTypes } from "mongoose";


export type DronLogsHistoryDocument = HydratedDocument<DronLogsHistory>

@Schema({
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

export class DronLogsHistory {

    @Prop()
    date: Date;

    @Prop({type: Object})
    data: object;
    
}

const DronLogsHistorySchema = SchemaFactory.createForClass(DronLogsHistory);

export {DronLogsHistorySchema};