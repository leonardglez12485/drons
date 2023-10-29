import { Medication } from '../../entities/medication.entity';

export const medStub = (): Medication => {
   return {
    names: 'Loratadine',
    weight: 140,
    code:'AB-45',
    picture: 'img.jpg'

}
}