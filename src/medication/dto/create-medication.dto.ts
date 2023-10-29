import { ApiProperty } from "@nestjs/swagger";
import { Contains, IsNumber, IsOptional, IsString, Max, MinLength, NotContains } from "class-validator";


export class CreateMedicationDto {

    @ApiProperty({ description: 'Medical Name', uniqueItems: true })
    @IsString()
    @MinLength(1)
    names: string;

    @ApiProperty()
    @IsNumber()
    weight: number;

    @ApiProperty({ description: 'Medical Code' })
    @IsString()
    code: string;

    @ApiProperty({
        description: 'Medication Image',
        required: true,
        type: 'file',
        properties: {
            picture: {
            type: 'string',
            format: 'binary',
          },
        },   
      })
    picture: string;
}
