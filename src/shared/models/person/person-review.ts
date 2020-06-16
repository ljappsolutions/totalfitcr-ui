import * as jf from 'joiful';

export class PersonReviewInfo {
  @jf.number().required().not(0)
  height: number = 0;

  @jf.number().required().not(0)
  weight: number = 0;

  @jf.number().required().not(0)
  fat: number = 0;

  @jf.number().required().not(0)
  muscle: number = 0;

  @jf.number().required().not(0)
  water: number = 0;
}