import { FunctionComponent } from "react";
import React from "react";
import { createUseStyles } from "react-jss";
import { Grid } from "@material-ui/core";
import { RoutineRow } from "./RoutineRow";

interface IRoutineDetailsProps {
  nbrOfWeeks: number;
  exercises: string[];
}

const useStyles = createUseStyles({
  routineDetails: {
    border: '1px solid black',
    height: '100%',
    display: 'flex',
    'overflow-x': 'auto',
  },
  header: {
    display: 'flex !important',
    flexWrap: 'nowrap !important',
    overflow: 'auto',
  },
  cellFixed: {
    width: '195px',
    flex: '0 0 195px',
  },
  cell: {
    width: '195px',
    flex: '0 0 auto',
  }
});

export const RoutineDetails: FunctionComponent<IRoutineDetailsProps> = (props) => {
  const classes = useStyles();
  const { nbrOfWeeks, exercises } = props;
  const weeks = Array.from(Array(nbrOfWeeks).keys());

  return (
    <Grid container className={classes.routineDetails}>
      <Grid container className={classes.header}>
        <div className={classes.cellFixed}>Ejercicio</div>
        <div className={classes.header}>
          {
            weeks.map((week) =>
              <div className={classes.cell}>{`Week ${week + 1}`}</div>)
          }
        </div>
      </Grid>
      {
        exercises.map((exercise) =>
          <Grid container>
            <RoutineRow nbrOfWeeks={nbrOfWeeks} exercise={exercise} />
          </Grid>
        )
      }
    </Grid>
  );
}
