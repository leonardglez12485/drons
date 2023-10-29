import { Test } from '@nestjs/testing';
import { MedicationController } from '../medication.controller';
import { MedicationService } from '../medication.service';
import { medStub } from './stubs/medication.stubs';
import { Medication } from '../entities/medication.entity';
import { CreateMedicationDto } from '../dto/create-medication.dto';


jest.mock('../medication.service');

describe('MedicationController', () => {
  let controller: MedicationController;
  let service: MedicationService;

  beforeEach(async () => {
    const mRef = await Test.createTestingModule({
      imports: [],
      controllers: [MedicationController],
      providers: [MedicationService],
    }).compile();

    controller = mRef.get<MedicationController>(MedicationController);
    service = mRef.get<MedicationService>(MedicationService);
    jest.clearAllMocks();
  });

   describe('findOne', ()=>{
    describe('when findOne is called', ()=>{
     let med: Medication;
      
      beforeEach(async ()=>{
       med =  await controller.findOne(medStub().names);
      })
   
      test('then it should call service', ()=>{
         expect(service.findOne).toBeCalledWith(medStub().names);
      })

      test('then it should return a medication', ()=>{
        expect(med).toEqual(medStub());
     })
    }) 
    
   })
  //  /////////////////////////////////////////////////////////

   describe('findAll', ()=>{
    describe('when findAll is called', ()=>{
    let med: Medication[];
      
      beforeEach(async ()=>{
        med =  await controller.findAll();
      })
   
      test('then it should call service', ()=>{
         expect(service.findAll).toHaveBeenCalled();
      })

      test('then it should return a medications', ()=>{
        expect(med).toEqual([medStub()]);
     })
    }) 
    
   })

  //     /////////////////////////////////////////////////////////

      describe('create', ()=>{
        describe('when create is called', ()=>{
        let med: Medication;
        let dto: CreateMedicationDto   
        let file: Express.Multer.File       
          beforeEach(async ()=>{
            dto={
              names: medStub().names,
              weight: medStub().weight,
              code: medStub().code,
              picture: medStub().picture

            }
            med = await controller.create(dto, file)
          })
       
          test('then it should call service', ()=>{
             expect(service.create).toHaveBeenCalledWith(dto, file);
          })
    
          test('then it should return a medications', ()=>{
            expect(med).toEqual(medStub());
         })
        }) 
        
       })
});
