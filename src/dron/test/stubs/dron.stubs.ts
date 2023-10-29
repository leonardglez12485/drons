import { Dron, Model, State } from "../../entities/dron.entity"



export const dronStub = (): Dron => {
    return {
    serialNumber: 'KM-45',
     model: Model.Cruiserweight,
     maxWeight: 500,
     batery: 100,
     state: State.LOADING,
     charge:[]
 
 }
 }