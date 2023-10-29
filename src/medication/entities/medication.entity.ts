import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";



export type MedicationDocument = HydratedDocument<Medication>

@Schema({
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

export class Medication {

@Prop({required: true, index: true, unique: true})
 names: string;
 
 @Prop({required: true})
 weight: number;

 @Prop({required: true, index: true, unique: true,  uppercase: true})
 code: string;

 @Prop({required: false})
 picture: string;
 
}

const MedicationSchema = SchemaFactory.createForClass(Medication);

export {MedicationSchema};