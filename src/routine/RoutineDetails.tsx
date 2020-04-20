import { FunctionComponent } from "react";
import React from "react";
import { createUseStyles } from "react-jss";
import { Grid } from "@material-ui/core";
import { Exercise } from "../shared/models/exercise";
import { colors } from "../shared/colors";

interface IRoutineDetailsProps {
  nbrOfWeeks: number;
  exercises: Exercise[];
}

const useStyles = createUseStyles({
  routineDetails: {
    border: '1px solid black',
    padding: '10px',
    display: 'flex',
    'overflow-x': 'auto',
  },
  routineContent: {
    display: 'flex !important',
    flexWrap: 'nowrap !important',
    overflow: 'auto',
  },
  row: {
    padding: '10px 5px',
    borderBottom: '1px solid black'
  },
  alternateRow: {
    backgroundColor: colors.lightGrey
  },
  scrollableRow: {
    display: 'flex !important',
    flexWrap: 'nowrap !important',
  },
  overflow: {
    overflow: 'auto',
  },
  columnFixed: {
    width: '195px',
    flex: '0 0 195px',
  },
  cell: {
    width: '195px',
    flex: '0 0 auto',
  },
  noExercises: {
    textAlign: 'center',
    padding: '10px'
  }
});

export const RoutineDetails: FunctionComponent<IRoutineDetailsProps> = (props) => {
  const classes = useStyles();
  const { nbrOfWeeks, exercises } = props;
  const weeks = Array.from(Array(nbrOfWeeks).keys());

  const getColorBackground = (index: number) => {
    return index % 2 === 1 ? classes.alternateRow : '';
  }

  const getColumnFixed = () => {
    return (
      <div className={classes.columnFixed}>
        <Grid container className={classes.row}>
          <b>Ejercicio</b>
        </Grid>
        {
          exercises.map((exercise, index) =>
            <Grid container key={`name-${exercise.id}`}
              className={`${classes.row} ${getColorBackground(index)}`}>
              {exercise.name}
            </Grid>
          )
        }
      </div>
    )
  }

  const getDynamicColumns = () => {
    return (
      <div className={classes.overflow}>
        <Grid container className={`${classes.row} ${classes.scrollableRow}`}>
          {
            weeks.map((week) =>
              <div className={classes.cell} key={`header-${week}`}>
                <b>{`Semana ${week + 1}`}</b>
              </div>
            )
          }
        </Grid>
        {
          exercises.map((exercise, index) =>
            <Grid container 
              className={`${classes.row} ${classes.scrollableRow} ${getColorBackground(index)}`}
              key={`content-${exercise.id}`}>
              {
                weeks.map((week) =>
                  <div className={classes.cell} key={`${exercise.id}-${week}`}>{`3 x 10`}</div>)
              }
            </Grid>
          )
        }
      </div>
    );
  }

  return (
    <Grid container className={classes.routineDetails}>
      <Grid container className={classes.routineContent}>
        {getColumnFixed()}
        {getDynamicColumns()}
      </Grid>
      {
        exercises.length === 0 && (
          <Grid item xs={12} className={classes.noExercises}>
            No hay ejercicios agregados
          </Grid>
        )
      }
    </Grid>
  );
}
