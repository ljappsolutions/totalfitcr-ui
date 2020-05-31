import { IPersonInformationState } from "./person/person-information";
import { IPersonInjury } from "./person/person-injury";
import { IPersonReview } from "./person/person-review";
import { IPersonRecord } from "./person/person-record";
import { IRoutine } from "./routine";

export interface IAppointment {
  personInformation: IPersonInformationState;
  personInjury: IPersonInjury;
  personReview: IPersonReview;
  personRecord: IPersonRecord;
  routines: IRoutine[];
}