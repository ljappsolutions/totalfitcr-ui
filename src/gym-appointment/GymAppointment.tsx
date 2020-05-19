import React, { FunctionComponent, useState } from "react";
import { CustomBreadcrumbs } from "../shared/components/Breadcrumbs";
import { Grid, Button } from "@material-ui/core";
import { PersonInformation } from "../person-record/PersonInformation";
import { PersonReview } from "../person-record/PersonReview";
import { PersonInjury } from "../person-record/PersonInjury";
import { PersonRecord } from "../person-record/PersonRecord";
import { Routine } from "../routine/Routine";
import AppointmentContext from "../shared/contexts/appointment";
import { IAppointment } from "../shared/models/appointment";
import { IPersonInformationState } from "../shared/models/person/person-information";
import { IPersonInjury } from "../shared/models/person/person-injury";
import { IPersonReview } from "../shared/models/person/person-review";
import { IPersonRecord } from "../shared/models/person/person-record";

interface IProps {

}

export const GymAppointment: FunctionComponent<IProps> = (props) => {
  const [step, setStep] = useState<number>(1);
  const [state, setState] = useState<IAppointment>({
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
    }
  });
  const totalLength = state.personRecord.numberOfRoutines + 2;

  const moveStepForward = () => {
    setStep(step+1);
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

  const getFirstStep = () => {
    return (
      <>
        <PersonInformation />
        <PersonReview />
        <PersonInjury />
        <PersonRecord />
      </>
    )
  }

  const getRoutine = () => {
    return (
      <Routine />
    )
  }

  const updatePersonInformation = (info: IPersonInformationState) => {
    setState({
      ...state,
      personInformation: info
    })
  }

  const updatePersonInjury = (info: IPersonInjury) => {
    setState({
      ...state,
      personInjury: info
    })
  }

  const updatePersonReview = (info: IPersonReview) => {
    setState({
      ...state,
      personReview: info
    })
  }

  const updatePersonRecord = (info: IPersonRecord) => {
    setState({
      ...state,
      personRecord: info
    })
  }

  const contextInfo = {
    state
    , updatePersonInformation
    , updatePersonInjury
    , updatePersonReview
    , updatePersonRecord };
  return (
    <AppointmentContext.Provider value={contextInfo}>
      <CustomBreadcrumbs numberOfRoutines={state.personRecord.numberOfRoutines} currentStep={step}></CustomBreadcrumbs>
      <Grid container>
        { step === 1 && getFirstStep() }
        { isRoutineStep() && getRoutine() }
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