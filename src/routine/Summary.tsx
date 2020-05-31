import React, { useContext } from "react"
import AppointmentContext, { IAppointmentContext } from "../shared/contexts/appointment";
import { Grid } from "@material-ui/core";

export const Summary: React.FunctionComponent = () => {
  const context = useContext<IAppointmentContext | null>(AppointmentContext);
  if (!context) return null;
  const { state } = context;
  const { routines } = state;
  return (
    <>
      {
        routines && (
          routines.map((routine, index) => <Grid container>
            <h2>Routine {index + 1}</h2>
            <ul>
              {
                routine.exercises.map(exercise => <li>{exercise.name}</li>)
              }
            </ul>
          </Grid>)
        )
      }
    </>
  )  
}