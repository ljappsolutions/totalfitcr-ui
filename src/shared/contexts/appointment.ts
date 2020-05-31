import React from "react";
import { IAppointment } from "../models/appointment";
import { IPersonInformationState } from "../models/person/person-information";
import { IPersonInjury } from "../models/person/person-injury";
import { IPersonReview } from "../models/person/person-review";
import { IPersonRecord } from "../models/person/person-record";
import { IRoutine } from "../models/routine";

export interface IAppointmentContext {
  state: IAppointment;
  updatePersonInformation: (info: IPersonInformationState) => void;
  updatePersonInjury: (info: IPersonInjury) => void;
  updatePersonReview: (info: IPersonReview) => void;
  updatePersonRecord: (info: IPersonRecord, routines?: IRoutine[]) => void;
  setRoutine: (position: number, routine: IRoutine) => void;
}

const AppointmentContext = React.createContext<IAppointmentContext | null>(null);
export default AppointmentContext;