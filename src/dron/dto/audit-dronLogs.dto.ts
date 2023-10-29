import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class AudirDronLogsDTO {
  
  
  @ApiProperty({ type: String, example: '2023-10-01' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ type: String, example: '2023-10-30' })
  @IsString()
  @IsNotEmpty()
  endDate: string;
  }