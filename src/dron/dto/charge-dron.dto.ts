import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class ChargeDronDto {
    
    @ApiProperty({description:'Name of Medication to Charge'})
    @IsString()
    medication: string;

    @ApiProperty({description:'Drone to charge'})
    @IsString()
    drone: string;
}