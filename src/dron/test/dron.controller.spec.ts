import { Test } from '@nestjs/testing';
import { DronController } from '../dron.controller';
import { DronService } from '../dron.service';
import { Dron } from '../entities/dron.entity';
import { dronStub } from './stubs/dron.stubs';
import { CreateDronDto } from '../dto/create-dron.dto';

jest.mock('../dron.service');

describe('DronController', () => {
  let controller: DronController;
  let service: DronService;

  beforeEach(async () => {
    const mRef = await Test.createTestingModule({
      imports: [],
      controllers: [DronController],
      providers: [DronService],
    }).compile();

    controller = mRef.get<DronController>(DronController);
    service = mRef.get<DronService>(DronService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let drone: Dron;

      beforeEach(async () => {
        drone = await controller.findOne(dronStub().serialNumber);
      });

      test('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(dronStub().serialNumber);
      });

      test('then it should return a medication', () => {
        expect(drone).toEqual(dronStub());
      });
    });
  });

  //////////////////////////////////////////////////////////////

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let drone: Dron[];

      beforeEach(async () => {
        drone = await controller.findAll();
      });

      test('then it should call service', () => {
        expect(service.findAll).toHaveBeenCalled();
      });

      test('then it should return a medications', () => {
        expect(drone).toEqual([dronStub()]);
      });
    });
  });

  ////////////////////////////////////////////////////////////////
  describe('create', () => {
    describe('when create is called', () => {
      let drone: Dron;
      let dto: CreateDronDto;
      beforeEach(async () => {
        dto = {
          serialNumber: dronStub().serialNumber,
          model: dronStub().model,
          maxWeight: dronStub().maxWeight,
          batery: dronStub().batery,
          state: dronStub().state,
          charge: dronStub().charge,
        };
        drone = await controller.create(dto);
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(dto);
      });

      test('then it should return a medications', () => {
        expect(drone).toEqual(dronStub());
      });
    });
  });
});
