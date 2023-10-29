import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";
import { Model, State } from "../entities/dron.entity";
import { Medication } from "src/medication/entities/medication.entity";


export class CreateDronDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    serialNumber: string;
 
    @ApiProperty()
    @IsEnum(Model)
    model: Model;
   
    @ApiProperty()
    @Max(500)
    maxWeight: number;
   
    @ApiProperty()
    @IsNumber()
    batery: number;
   
    @ApiProperty()
    @IsEnum(State)
    state: State;
    
    @ApiProperty({required: false})
    @IsOptional()
    charge?: Medication[];

}
