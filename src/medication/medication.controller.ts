import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
//import { fileFilter, fileNamer } from '../../src/common/helpers';
import { Response } from 'express';
import { fileFilter, fileNamer } from 'src/common/helpers';






@ApiTags('Medication')
@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @ApiResponse({status: 201})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('picture', {
    fileFilter: fileFilter,
    limits: {fileSize: 1e+6},
    storage: diskStorage({
      destination: './static/medications',
      filename: fileNamer
    }),
    
  }))
  async create(
    @Body() dto: CreateMedicationDto,
    @UploadedFile() file: Express.Multer.File
    ){
    if(!file) throw new BadRequestException('Invalid image extension !!!')
    dto.picture = file.filename;
    return this.medicationService.create(dto, file.filename);
  }


  @Get()
 async  findAll(
   // @Query() dto: PaginationDto
    ){
    return await this.medicationService.findAll();
  }

  @Get(':term')
  async findOne(
    @Param('term') term: string
    ){
    return await this.medicationService.findOne(term);
  }

  @Get('img/:term')
  async findImage(
    @Param('term') term: string,
    @Res() res: Response,
    ){
    return this.medicationService.findImage(term, res);
  }

  @Patch(':term')
  update(
    @Param('term') term: string, 
    @Body() dto: UpdateMedicationDto
    ){
    return this.medicationService.update(term, dto);
  }

  @Delete(':term')
  remove(
    @Param('term') term: string
    ) {
    return this.medicationService.remove(term);
  }
}
