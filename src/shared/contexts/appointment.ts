import React from "react";
import { IAppointment } from "../models/appointment";
import { PersonDetailsInfo } from "../models/person/person-details";
import { PersonInjuryInfo } from "../models/person/person-injury";
import { PersonRecordInfo } from "../models/person/person-record";
import { IRoutine } from "../models/routine";
import { PersonReviewInfo } from "../models/person/person-review";
import * as jf from 'joiful';

export const defaultValue: IAppointment = {
  personInformation: {
    id: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
  },
  personInjury: {
    haveInjury: false,
    injuries: [],
    injuryNotes: ''
  },
  personReview: {
    height: 0,
    weight: 0,
    fat: 0,
    muscle: 0,
    water: 0
  },
  personRecord: {
    objective: '',
    numberOfRoutines: 1,
    numberOfWeeks: 1,
    routinesFocuses: []
  },
  routines: [{
    exercises: [],
    nbrOfWeeks: 1
  }],
  errors: {
    personInformation: null,
    personInjury: null,
    personRecord: null,
    personReview: null,
  }
}

export interface IAppointmentContext {
  state: IAppointment;
  updatePersonInformation: (info: PersonDetailsInfo) => void;
  updatePersonInjury: (info: PersonInjuryInfo) => void;
  updatePersonReview: (info: PersonReviewInfo) => void;
  updatePersonRecord: (info: PersonRecordInfo, routines?: IRoutine[]) => void;
  setRoutine: (position: number, routine: IRoutine) => void;
}

export const validateDetails = (info: PersonDetailsInfo) => {
  const validator = new jf.Validator({ 
    abortEarly: false,
  })
  const validation = validator.validateAsClass(info, PersonDetailsInfo);
  return validation;
}

export const validateInjury = (info: PersonInjuryInfo) => {
  const validation = jf.validateAsClass(info, PersonInjuryInfo);
  return validation;
}

export const validateReview = (info: PersonReviewInfo) => {
  const validation = jf.validateAsClass(info, PersonReviewInfo);
  return validation;
}

export const validateRecord = (info: PersonRecordInfo) => {
  const validation = jf.validateAsClass(info, PersonRecordInfo);
  return validation;
}

const AppointmentContext = React.createContext<IAppointmentContext | null>(null);
export default AppointmentContext;
