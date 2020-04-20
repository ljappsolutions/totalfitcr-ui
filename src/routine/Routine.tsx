import { FunctionComponent, useState } from "react";
import React from "react";
import { createUseStyles } from "react-jss";
import { Grid } from "@material-ui/core";
import { RoutineTemplates } from "./RoutineTemplates";
import { RoutineDetails } from "./RoutineDetails";
import { RoutineTemplate } from "../shared/models/routine-template";
import { Exercise } from "../shared/models/exercise";
import shortid from "shortid";

interface IRoutineProps {

}

interface Routine {
  nbrOfWeeks: number;
  exercises: Exercise[];
}

const useStyles = createUseStyles({

});

export const Routine: FunctionComponent<IRoutineProps> = (props) => {
  const classes = useStyles();

  const [routine, setRoutine] = useState<Routine>({
    nbrOfWeeks: 5,
    exercises: [],
  });

  const addExercises = (template: RoutineTemplate) => {
    setRoutine({
      ...routine,
      exercises: [
        ...routine.exercises,
        ...template.exercises.map(x => {
          x.id = shortid.generate();
          return x;
        })
      ]
    });
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <RoutineTemplates selectTemplate={addExercises} />
      </Grid>
      <Grid item xs={10}>
        <RoutineDetails nbrOfWeeks={routine.nbrOfWeeks} exercises={routine.exercises}/>
      </Grid>
    </Grid>
  );
}
