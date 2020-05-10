import React, { FunctionComponent, useState } from "react";
import { CustomBreadcrumbs } from "../shared/components/Breadcrumbs";
import { Grid, Button } from "@material-ui/core";
import { PersonInformation } from "../person-record/PersonInformation";
import { PersonReview } from "../person-record/PersonReview";
import { PersonInjury } from "../person-record/PersonInjury";
import { PersonRecord } from "../person-record/PersonRecord";
import { Routine } from "../routine/Routine";

interface IProps {

}

export const GymAppointment: FunctionComponent<IProps> = (props) => {
  const [step, setStep] = useState<number>(1);
  const [nbrRoutines, setNbrRoutines] = useState<number>(4);
  const totalLength = nbrRoutines + 2;

  const moveStepForward = () => {
    setStep(step+1);
  }

  const canMoveForward = () => {
    return step < nbrRoutines + 2;
  };

  const moveStepBackward = () => {
    setStep(step-1);
  }

  const canMoveBackward = () => {
    console.log('Checking');
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

  return (
    <>
      <CustomBreadcrumbs numberOfRoutines={nbrRoutines} currentStep={step}></CustomBreadcrumbs>
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
    </>
  );
}