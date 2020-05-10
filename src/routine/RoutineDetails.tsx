import { FunctionComponent, useEffect, useRef, useState } from "react";
import React from "react";
import { Grid, Checkbox, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableExercise } from "../shared/models/exercise";
import { useRoutineDetailsStyles } from "./styles";
import { CustomTextField } from "../shared/components/TextField";
import { getArrayFromNumber } from "../shared/utils/arrays";

interface IRoutineDetailsProps {
  nbrOfWeeks: number;
  exercises: EditableExercise[];
  onDelete: (ids: string[]) => void;
}

export const RoutineDetails: FunctionComponent<IRoutineDetailsProps> = (props) => {
  const classes = useRoutineDetailsStyles();
  const { nbrOfWeeks } = props;
  const [exercises, setExercises] = useState<EditableExercise[]>([]);
  const weeks = getArrayFromNumber(nbrOfWeeks);
  const rowsRefs = useRef<Map<string, (HTMLDivElement | null)[]>>(new Map());
  const [selectAll, setSelectAll] = useState<boolean>(false);
  
  useEffect(() => {
    setExercises([...props.exercises])
    verifySelectAll(props.exercises);
    rowsRefs.current.clear();
    syncRowsHeight();
  }, [props]);
  
  const onSelectAll = (newValue: boolean) => {
    setSelectAll(newValue);
    exercises.forEach(exercise => {
      exercise.selected = newValue;
    })
    setExercises([...exercises]);
  };

  const onSelectRow = (id: string, isChecked: boolean) => {
    const exercise = exercises.find(x => x.id === id);
    if(exercise) {
      exercise.selected = isChecked;
      setExercises([...exercises]);
      verifySelectAll(exercises);
    }
  }

  const verifySelectAll = (listToCheck: EditableExercise[]) => {
    setSelectAll(listToCheck.length > 0 && listToCheck.every(x => x.selected));
  }

  const getColorBackground = (index: number) => {
    return index % 2 === 1 ? classes.alternateRow : '';
  };


  useEffect(() => {
    const exerciseHeader = document.getElementById('exerciseHeader');
    const weeksHeader = document.getElementById('weeksHeader');
    if(exerciseHeader && weeksHeader) {
      weeksHeader.style.height = `${exerciseHeader.offsetHeight}px`;
    }
  });

  useEffect(() => {
    syncRowsHeight();
  }, [exercises]);

  const syncRowsHeight = () => {
    const entries = Array.from(rowsRefs.current.keys());
    entries.forEach(entry => {
      const rows = rowsRefs.current.get(entry);
      if(!rows) return;
      const fixedHeight = rows[0]?.offsetHeight;
      if(rows[1]) {
        rows[1].style.height = `${fixedHeight}px`;
      }
    })
  }

  const addRef = (id: string | undefined, ref: HTMLDivElement | null) => {
    if (!id) return;
    if(rowsRefs.current.has(id)) {
      const existingRows = rowsRefs.current.get(id);
      if(existingRows) {
        rowsRefs.current.set(id, [
          ...existingRows,
          ref
        ])
      }
    } else {
      rowsRefs.current.set(id, [
        ref
      ])
    }
  }

  const getColumnFixed = () => {
    return (
      <div className={classes.columnFixed}>
        <Grid container className={classes.cell} id="exerciseHeader">
          <Grid item xs={3}>
            <Checkbox
              inputProps={{ 'aria-label': 'primary checkbox' }}
              checked={selectAll}
              color={"primary"}
              onChange={(event) => onSelectAll(event.target.checked) }
            />
          </Grid>
          <Grid item xs={9}>
            <p><b>Ejercicio</b></p>
          </Grid>
        </Grid>
        {
          exercises.map((exercise, index) =>
            <Grid container key={`name-${exercise.id}`}
              className={`${classes.cell} ${getColorBackground(index)}`}
              ref={(ref) => { addRef(exercise.id, ref); }}>
                <Grid item xs={3}>
                  <Checkbox
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    checked={exercise.selected}
                    color={"primary"}
                    onChange={(event) => onSelectRow(exercise.id, event.target.checked) }
                  />
                </Grid>
                <Grid item xs={9}>
                  <p>{exercise.name}</p>
                </Grid>
            </Grid>
          )
        }
      </div>
    )
  }

  const updateExerciseWeekInfo = (exerciseId: string, weekNbr: number) => (event: {target: {value: string}}) => {
    const exercise = exercises.find(x => x.id === exerciseId);
    if(!exercise) return;
    const serie = exercise.series.find(x => x.week === weekNbr);
    if(!serie) return;
    serie.information = event.target.value;
    setExercises([
      ...exercises
    ]);
  }

  const getDynamicColumns = () => {
    return (
      <div className={classes.overflow}>
        <Grid container className={`${classes.scrollableRow}`}
          id="weeksHeader">
          {
            weeks.map((week) =>
              <div className={classes.cell} key={`header-${week}`}>
                <p><b>{`Semana ${week + 1}`}</b></p>
              </div>
            )
          }
        </Grid>
        {
          exercises.map((exercise, index) =>
            <Grid container 
              className={`${classes.scrollableRow}`}
              key={`content-${exercise.id}`}
              ref={(ref) => { addRef(exercise.id, ref); }}>
              {
                weeks.map((week) => {
                    const weekInfo = exercise.series.find(x => x.week === week)
                    return (
                      <div className={`${classes.cell} ${getColorBackground(index)}`} key={`${exercise.id}-${week}`}>
                        <CustomTextField value={weekInfo?.information}
                            onChange={updateExerciseWeekInfo(exercise.id, week)} placeholder={"3x10"}
                            variant="standard"/>
                      </div>
                    );
                  }
                )
              }
            </Grid>
          )
        }
      </div>
    );
  }

  const getSelected = (): EditableExercise[] => {
    return exercises.filter(x => x.selected);
  };

  const removeSelected = () => {
    props.onDelete(exercises.filter(x => !x.selected).map(x => x.id));
  };

  return (
    <Grid container className={classes.routineDetails}>
      <Grid container className={classes.routineContent}>
        {getColumnFixed()}
        {getDynamicColumns()}
      </Grid>
      <br />
      {
        exercises.length > 0 && (
          <Grid item xs={12} className={classes.actionBar}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              disabled={getSelected().length === 0}
              onClick={removeSelected}
            >
              Delete
            </Button>
          </Grid>
        )
      }
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
