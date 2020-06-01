import { PersonDetailsInfo } from "./person/person-details";
import { PersonInjuryInfo } from "./person/person-injury";
import { PersonRecordInfo } from "./person/person-record";
import { IRoutine } from "./routine";
import { PersonReviewInfo } from "./person/person-review";
import { IDynamic } from "./dynamic";

export interface IAppointment {
  personInformation: PersonDetailsInfo;
  personInjury: PersonInjuryInfo;
  personReview: PersonReviewInfo;
  personRecord: PersonRecordInfo;
  routines: IRoutine[];
  errors: {
    personInformation: IDynamic | null,
    personInjury: IDynamic | null,
    personReview: IDynamic | null,
    personRecord: IDynamic | null
  }
}
