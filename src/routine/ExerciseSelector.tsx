import React, { FunctionComponent, useState, useEffect } from "react";
import { Exercise } from "../shared/models/exercise";
import { Grid } from "@material-ui/core";
import { ExerciseService } from "../shared/services/exercise";
import { TemplateBox } from "./TemplateBox";
import { RoutineTemplate } from "../shared/models/routine-template";
import { useSelectorStyles } from "./styles";
import { CustomTextField } from "../shared/components/TextField";

interface IExerciseSelectorProps {
  selectExercise: (exercise: RoutineTemplate | Exercise) => void;
}

export const ExerciseSelector: FunctionComponent<IExerciseSelectorProps> = (props) => {
  const classes = useSelectorStyles();
  const { selectExercise } = props;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [exerciseName, setExerciseName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const exerciseService = new ExerciseService();
      const response = await exerciseService.getExercises();
      setExercises(response);
      setFilteredExercises(response);
    };
    fetchData();
  }, []);

  const filterExercises = (event: any) => {
    const { value } = event.target;
    setExerciseName(value);
    setFilteredExercises(exercises.filter(x => x.name.indexOf(value) > -1));
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>Ejercicios</Grid>
      </Grid>
      <Grid container className={classes.filter}>
        <Grid item xs={12}>
          <CustomTextField placeholder="Filter by name" value={exerciseName}
            onChange={filterExercises} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {
            exercises && (
              <ul className={classes.templateBoxList}>
                {
                  filteredExercises.map(template => (
                    <TemplateBox template={template}
                      key={template.name}
                      selectable={true} 
                      onDoubleClick={selectExercise}/>
                  ))
                }
              </ul>
            )
          }
        </Grid>
      </Grid>
    </>
  );
}