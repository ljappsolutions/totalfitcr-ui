import React, { FunctionComponent, useState } from "react";
import { Grid } from "@material-ui/core";
import { RoutineTemplateSelector } from "./RoutineTemplates";
import { RoutineDetails } from "./RoutineDetails";
import { RoutineTemplate } from "../shared/models/routine-template";
import { EditableExercise, SeriesDetails, Exercise } from "../shared/models/exercise";
import shortid from "shortid";
import { ExerciseSelector } from "./ExerciseSelector";
import { getArrayFromNumber } from "../shared/utils/arrays";

interface IProps {

}

interface Routine {
  nbrOfWeeks: number;
  exercises: EditableExercise[];
}

export const Routine: FunctionComponent<IProps> = (props) => {
  const [routine, setRoutine] = useState<Routine>({
    nbrOfWeeks: 5,
    exercises: [],
  });

  const includeFromTemplate = (template: RoutineTemplate | Exercise) => {
    const templateCasted = template as RoutineTemplate;
    const exercises = templateCasted.exercises.map(x => {
      const newExercise: EditableExercise = {
        ...x,
        id: shortid.generate(),
        selected: false,
        series: generateSeries(),
      };
      return newExercise;
    });
    addExercises(exercises);
  }

  const includeExercise = (exercise: RoutineTemplate | Exercise) => {
    const newExercise: EditableExercise = {
      ...exercise as Exercise,
      id: shortid.generate(),
      selected: false,
      series: generateSeries(),
    };
    addExercises([newExercise]);
  }

  const addExercises = (exercises: EditableExercise[]) => {
    setRoutine({
      ...routine,
      exercises: [
        ...routine.exercises,
        ...exercises
      ],
    });
  }

  const generateSeries = () => {
    const weeks = getArrayFromNumber(routine.nbrOfWeeks);
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
    });
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid container>
          <RoutineTemplateSelector selectTemplate={includeFromTemplate} />
        </Grid>
        <Grid container>
          <ExerciseSelector selectExercise={includeExercise} />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <RoutineDetails 
          nbrOfWeeks={routine.nbrOfWeeks} 
          exercises={routine.exercises}
          onDelete={onDeleteExercises} />
      </Grid>
    </Grid>
  );
}
