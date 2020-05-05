import { createUseStyles } from "react-jss";
import React, { useState } from "react";
import { Grid, Select, MenuItem, InputAdornment, Input, InputLabel, FormControlLabel, Checkbox, TextField, FormControl } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

interface IPersonState {
  objective: string;
  numberOfRoutines: number;
  numberOfWeeks: number;
  routinesFocuses: string[];
  haveInjury: boolean;
  injuries: string[];
  injuryNotes: string;
}

interface IObjective {
  name: string;
}
const objectives: Array<IObjective> = [{ name: 'Tren superior' }, { name: 'Tren inferior' }, { name: 'Cardio' }];

interface IRoutineFocus {
  name: string;
  id: number;
}
const routinesfocus: Array<IRoutineFocus> = [{ name: 'Enfoque 1', id: 1 }, { name: 'Enfoque 2', id: 2 }, { name: 'Enfoque 3', id: 3 },];

interface IInjury {
  name: string;
  id: number;
}
const injuries: Array<IInjury> = [{ name: 'Tobillo Derecho', id: 1 }, { name: 'Tobillo Izquierdo', id: 2 }, { name: 'Rodilla Derecha', id: 3 }, { name: 'Rodilla Izquierda', id: 4 },];

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
  const [state, setState] = useState<IPersonState>({
    objective: '',
    numberOfRoutines: 1,
    numberOfWeeks: 1,
    routinesFocuses: [],
    haveInjury: false,
    injuries: [],
    injuryNotes: ''
  });
  const routines = Array.from(Array(state.numberOfRoutines).keys());

  const [errors, setErrors] = useState<any>({});

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'numberOfRoutines') {
      value = parseInt(value);
    }
    if (propName === 'haveInjury') {
      value = event.target.checked;
    }
    setState({
      ...state,
      [propName]: value,
    });
  }

  const onPropRoutinesFocusesChange = (index: number) => (event: any) => {
    let value = event.target.value;
    const previousValues = state.routinesFocuses;
    previousValues[index] = value;
    setState({
      ...state,
      routinesFocuses: previousValues
    });
  }

  const checkRequiredFields = (values: any) => {
    const requiredFields = ['name', 'lastName', 'email', 'id', 'phoneNumber', 'birthday']
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
        setErrors({ ...errors });
      }else{
        errors[field] = ''
      }
    });
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column} >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.haveInjury}
                    onChange={onPropChange('haveInjury')}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Lesión"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column} >
              {
                state.haveInjury && (
                  <>
                    <InputLabel id="demo-mutiple-checkbox-label">Lesiones</InputLabel>
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={injuries}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Seleccione lesiones"
                          />
                        )}
                      />

                    </FormControl>
                  </>
                )
              }
            </Grid>
            <Grid item xs={6} className={classes.column} >
              {
                state.haveInjury && (
                  <TextField
                    id="outlined-multiline-static"
                    label="Notas"
                    value={state.injuryNotes}
                    onChange={onPropChange('injuryNotes')}
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Notas"
                    fullWidth
                  />)
              }
            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
              <InputLabel htmlFor="formatted-text-mask-input">Objetivo</InputLabel>
              <Select
                value={state.objective}
                onChange={onPropChange('objective')}
                inputProps={{ 'aria-label': 'Without label' }}
                displayEmpty>
                <MenuItem value="" disabled >
                  Seleccione un objetivo
            </MenuItem>
                {
                  objectives.map((objective) => {
                    return <MenuItem value={objective.name}>{objective.name}</MenuItem>
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={6} className={classes.column}>
              <InputLabel htmlFor="formatted-text-mask-input">Cantidad de semanas</InputLabel>
              <Input
                type="Number"
                inputProps={{ className: 'digitsOnly', step: "1", min: 1 }}
                value={state.numberOfWeeks}
                onChange={onPropChange('numberOfWeeks')}
                endAdornment={<InputAdornment position="end">{state.numberOfWeeks == 1 ? 'semana' : 'semanas'}</InputAdornment>}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
              <InputLabel htmlFor="formatted-text-mask-input">Cantidad de rutinas</InputLabel>
              <Input
                type="Number"
                inputProps={{ className: 'digitsOnly', step: "1", min: 1 }}
                value={state.numberOfRoutines}
                onChange={onPropChange('numberOfRoutines')}
                endAdornment={<InputAdornment position="end">{state.numberOfRoutines == 1 ? 'día' : 'días'}</InputAdornment>}
              />
            </Grid>
            <Grid item xs={6} className={classes.column}>
              {
                routines.map((routine, index) => {
                  return (
                    <>
                      <InputLabel htmlFor="formatted-text-mask-input">Enfoque día {index + 1}</InputLabel>
                      <Select className={classes.select}
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={state.routinesFocuses[index] ?? ""}
                        onChange={onPropRoutinesFocusesChange(index)}
                        inputProps={{ 'aria-label': 'Without label' }}
                        displayEmpty
                      >
                        <MenuItem value="" disabled >
                          Seleccione un enfoque
                  </MenuItem>
                        {
                          routinesfocus.map((focus) => {
                            return <MenuItem value={focus.id}>{focus.name}</MenuItem>
                          })
                        }
                      </Select>
                    </>
                  )
                })
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}