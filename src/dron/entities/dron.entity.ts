import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, SchemaTypes } from "mongoose";
import { Medication } from "src/medication/entities/medication.entity";

export enum State {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED= 'LOADED', 
  DELIVERING='DELIVERING',
  DELIVERED= 'DELIVERED', 
  RETURNING= 'RETURNING'
}

export enum Model {
  Lightweight = 'Lightweight',
  Middleweight = 'Middleweight',
  Cruiserweight= 'Cruiserweight', 
  Heavyweight='Heavyweight'
}

export type DronDocument = HydratedDocument<Dron>

@Schema({
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

export class Dron {

@Prop({required: true, index: true, unique: true})
 serialNumber: string;
 
 @Prop({required: true, default: 'Lightweight'})
 model: Model;

 @Prop({required: true})
 maxWeight: number;

 @Prop({required: true, default: 100})
 batery: number;

 @Prop({required: true, default: 'LOADED'})
 state: State;
 
 @Prop({required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' }]})
 charge?: Medication[];

}

const DronSchema = SchemaFactory.createForClass(Dron);

export {DronSchema};