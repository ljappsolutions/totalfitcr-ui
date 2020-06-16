import * as jf from 'joiful';

export class PersonRecordInfo {
  @jf.string().required()
  objective: string = '';

  @jf.number().required()
  numberOfRoutines: number = 1;

  @jf.number().required()
  numberOfWeeks: number = 1;
  
  @jf.array().required().items(joi => joi.string())
  routinesFocuses: string[] = [''];
}