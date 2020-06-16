import * as jf from 'joiful';

export class PersonInjuryInfo {
  @jf.boolean()
  haveInjury: boolean = false;

  @jf.array().items(joi => joi.string())
  injuries: string[] = [];

  @jf.string()
  injuryNotes: string = '';
}