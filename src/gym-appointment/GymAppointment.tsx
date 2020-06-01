import React, { FunctionComponent, useState } from "react";
import { CustomBreadcrumbs } from "../shared/components/Breadcrumbs";
import { Grid, Button } from "@material-ui/core";
import { PersonInformation } from "../person-record/PersonInformation";
import { PersonReview } from "../person-record/PersonReview";
import { PersonInjury } from "../person-record/PersonInjury";
import { PersonRecord } from "../person-record/PersonRecord";
import { Routine } from "../routine/Routine";
import AppointmentContext, { defaultValue, validateDetails, validateInjury, validateReview, validateRecord } from "../shared/contexts/appointment";
import { IAppointment } from "../shared/models/appointment";
import { PersonDetailsInfo } from "../shared/models/person/person-details";
import { PersonInjuryInfo } from "../shared/models/person/person-injury";
import { PersonRecordInfo } from "../shared/models/person/person-record";
import { IRoutine } from "../shared/models/routine";
import { createUseStyles } from "react-jss";
import { Summary } from "../routine/Summary";
import { UserSearch } from "../shared/components/UserSearch";
import { PersonReviewInfo } from "../shared/models/person/person-review";
import { getErrorDetails, areThereErrors } from "../shared/utils/joiful";

interface IProps {

}

const useStyles = createUseStyles({
  container: {
    margin: "15px"
  },
  column: {
    padding: "0 5px"
  },
});

export const GymAppointment: FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const [step, setStep] = useState<number>(1);
  const [state, setState] = useState<IAppointment>(defaultValue);
  const totalLength = state.personRecord.numberOfRoutines + 2;

  const moveStepForward = () => {
    let isValidStep = false;
    if(step === 1) {
      const personDetailsValidation = validateDetails(state.personInformation);
      const personInjuryValidation = validateInjury(state.personInjury);
      const personReviewValidation = validateReview(state.personReview);
      const personRecordValidation = validateRecord(state.personRecord);
      isValidStep = !areThereErrors([personDetailsValidation,
        personInjuryValidation,
        personReviewValidation,
        personRecordValidation]);
      console.log(personDetailsValidation);
      if(!isValidStep) {
        setState({
          ...state,
          errors: {
            personInformation: getErrorDetails(personDetailsValidation),
            personInjury: getErrorDetails(personInjuryValidation),
            personRecord: getErrorDetails(personRecordValidation),
            personReview: getErrorDetails(personReviewValidation),
          }
        })
      }
    }
    if(isValidStep) {
      setStep(step+1);
    }
  }

  const canMoveForward = () => {
    return step < state.personRecord.numberOfRoutines + 2;
  };

  const moveStepBackward = () => {
    setStep(step-1);
  }

  const canMoveBackward = () => {
    return step !== 1;
  }

  const isRoutineStep = () => {
    return step > 1 && step < totalLength;
  }

  const isLastStep = () => {
    return step === totalLength;
  }

  const getFirstStep = () => {
    return (
      <>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Grid container className={classes.container}>
              <Grid item xs={6} className={classes.column}>
                <UserSearch selectUser={selectUser} user={state.personInformation} />
              </Grid>
            </Grid>
            <PersonInformation errors={state.errors?.personInformation ?? null} />
            <PersonReview />
            <PersonInjury />
            <PersonRecord />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </>
    )
  }

  const getRoutine = (step: number) => {
    const position = step - 2;
    return (
      <Routine routineNbr={position} />
    )
  }

  const getSummary = () => {
    return (
      <Summary />
    )
  }

  const selectUser = (userInfo: PersonDetailsInfo) => {
    setState({
      ...state,
      personInformation: {
        ...userInfo
      }
    })
  }

  const updatePersonInformation = (info: PersonDetailsInfo) => {
    setState({
      ...state,
      personInformation: info,
      errors: {
        ...state.errors,
        personInformation: null,
      }
    })
  }

  const updatePersonInjury = (info: PersonInjuryInfo) => {
    setState({
      ...state,
      personInjury: info,
      errors: {
        ...state.errors,
        personInjury: null,
      }
    })
  }

  const updatePersonReview = (info: PersonReviewInfo) => {
    setState({
      ...state,
      personReview: info,
      errors: {
        ...state.errors,
        personReview: null,
      }
    })
  }

  const updatePersonRecord = (info: PersonRecordInfo, routines?: IRoutine[]) => {
    setState({
      ...state,
      personRecord: info,
      errors: {
        ...state.errors,
        personRecord: null,
      },
      routines: routines ?? state.routines,
    })
  }

  const setRoutine = (position: number, routine: IRoutine) => {
    const newRoutines = [ ...state.routines ];
    newRoutines[position] = routine;
    setState({
      ...state,
      routines: newRoutines,
    })
  }

  const contextInfo = {
    state
    , updatePersonInformation
    , updatePersonInjury
    , updatePersonReview
    , updatePersonRecord
    , setRoutine
  };
  return (
    <AppointmentContext.Provider value={contextInfo}>
      <CustomBreadcrumbs numberOfRoutines={state.personRecord.numberOfRoutines} currentStep={step}></CustomBreadcrumbs>
      <Grid container className={classes.container}>
        { step === 1 && getFirstStep() }
        { isRoutineStep() && getRoutine(step) }
        { isLastStep() && getSummary() }
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={moveStepBackward}
            disabled={!canMoveBackward()}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={moveStepForward}
            disabled={!canMoveForward()}
          >
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </ AppointmentContext.Provider>
  );
}