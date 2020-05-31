import { createUseStyles } from "react-jss";
import React, { useState, useContext } from "react";
import { Grid, Select, MenuItem, InputAdornment, Input, InputLabel } from "@material-ui/core";
import AppointmentContext, { IAppointmentContext } from "../shared/contexts/appointment";

interface IObjective {
  name: string;
}
const objectives: Array<IObjective> = [{ name: 'Tren superior' }, { name: 'Tren inferior' }, { name: 'Cardio' }];

interface IRoutineFocus {
  name: string;
  id: number;
}
const routinesfocus: Array<IRoutineFocus> = [{ name: 'Enfoque 1', id: 1 }, { name: 'Enfoque 2', id: 2 }, { name: 'Enfoque 3', id: 3 },];

const useStyles = createUseStyles({
  container: {
    "margin": "15px"
  },
  column: {
    padding: "0 5px"
  },
  select: {
    "margin": "15px"
  }
})

export const PersonRecord: React.FunctionComponent = () => {
  const context = useContext<IAppointmentContext | null>(AppointmentContext);
  const classes = useStyles();
  const [errors, setErrors] = useState<any>({});
  if (!context) return null;
  const { state, updatePersonRecord } = context;
  const routines = Array.from(Array(state.personRecord.numberOfRoutines).keys());

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    const newRoutines = [...state.routines];
    if (propName === 'numberOfWeeks') {
      value = value ? parseInt(value) : 0;
      newRoutines.forEach(x => x.nbrOfWeeks = value);
    }
    updatePersonRecord({
      ...state.personRecord,
      [propName]: value,
    }, newRoutines);
  }

  const changeRoutines = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    const routines = value ? parseInt(value) : 0;
    const newRoutines = [...state.routines];
    if (routines > state.routines.length) {
      newRoutines.push({
        exercises: [],
        nbrOfWeeks: state.personRecord.numberOfWeeks,
      })
    } else {
      newRoutines.pop();
    }
    updatePersonRecord({
      ...state.personRecord,
      numberOfRoutines: routines,
    }, newRoutines);
  }

  const onPropRoutinesFocusesChange = (index: number) => (event: any) => {
    let value = event.target.value;
    const previousValues = state.personRecord.routinesFocuses;
    previousValues[index] = value;
    updatePersonRecord({
      ...state.personRecord,
      routinesFocuses: previousValues
    });
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.column}>
          <InputLabel htmlFor="formatted-text-mask-input">Objetivo</InputLabel>
          <Select
            value={state.personRecord.objective}
            onChange={onPropChange('objective')}
            inputProps={{ 'aria-label': 'Without label' }}
            displayEmpty>
            <MenuItem value="" disabled >
              Seleccione un objetivo
            </MenuItem>
            {
              objectives.map((objective) => {
                return <MenuItem value={objective.name} key={objective.name}>{objective.name}</MenuItem>
              })
            }
          </Select>
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <InputLabel htmlFor="formatted-text-mask-input">Cantidad de semanas</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "1", min: 1 }}
            value={state.personRecord.numberOfWeeks}
            onChange={onPropChange('numberOfWeeks')}
            endAdornment={<InputAdornment position="end">{state.personRecord.numberOfWeeks === 1 ? 'semana' : 'semanas'}</InputAdornment>}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.column}>
          <InputLabel htmlFor="formatted-text-mask-input">Cantidad de rutinas</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "1", min: 1 }}
            value={state.personRecord.numberOfRoutines}
            onChange={changeRoutines}
            endAdornment={<InputAdornment position="end">{state.personRecord.numberOfRoutines === 1 ? 'día' : 'días'}</InputAdornment>}
          />
        </Grid>
        <Grid item xs={6} className={classes.column}>
          {
            routines.map((routine, index) => {
              return (
                <div key={routine}>
                  <InputLabel htmlFor="formatted-text-mask-input">Enfoque día {index + 1}</InputLabel>
                  <Select className={classes.select}
                    value={state.personRecord.routinesFocuses[index] ?? ""}
                    onChange={onPropRoutinesFocusesChange(index)}
                    inputProps={{ 'aria-label': 'Without label' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled >
                      Seleccione un enfoque
                  </MenuItem>
                    {
                      routinesfocus.map((focus) => {
                        return <MenuItem value={focus.id} key={focus.id}>{focus.name}</MenuItem>
                      })
                    }
                  </Select>
                </div>
              )
            })
          }
        </Grid>
      </Grid>
    </>
  );
}