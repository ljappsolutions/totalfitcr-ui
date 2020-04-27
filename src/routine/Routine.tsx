import { FunctionComponent, useState } from "react";
import React from "react";
import { Grid } from "@material-ui/core";
import { RoutineTemplates } from "./RoutineTemplates";
import { RoutineDetails } from "./RoutineDetails";
import { RoutineTemplate } from "../shared/models/routine-template";
import { EditableExercise, SeriesDetails } from "../shared/models/exercise";
import shortid from "shortid";

interface IRoutineProps {

}

interface Routine {
  nbrOfWeeks: number;
  exercises: EditableExercise[];
}

export const Routine: FunctionComponent<IRoutineProps> = (props) => {
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
          const newExercise: EditableExercise = {
            ...x,
            id: shortid.generate(),
            selected: false,
            series: generateSeries(), 
          };
          return newExercise;
        })
      ]
    });
  }

  const generateSeries = () => {
    const weeks = Array.from(Array(routine.nbrOfWeeks).keys());
    const series: SeriesDetails[] = weeks.map(week => (
      {
        information: '',
        week,
      }
    ));
    return series;
  }

  const onDeleteExercises = (ids: string[]) => {
    setRoutine({
      ...routine,
      exercises: [
        ...routine.exercises.filter(x => ids.indexOf(x.id) >= 0),
      ]
    })
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <RoutineTemplates selectTemplate={addExercises} />
      </Grid>
      <Grid item xs={10}>
        <RoutineDetails nbrOfWeeks={routine.nbrOfWeeks} exercises={routine.exercises}
          onDelete={onDeleteExercises}/>
      </Grid>
    </Grid>
  );
}
