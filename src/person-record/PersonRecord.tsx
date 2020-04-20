import { createUseStyles } from "react-jss";
import React, { useState } from "react";
import { Grid, Select, MenuItem, FilledInput, InputAdornment, Input, InputLabel } from "@material-ui/core";
import { CustomTextField } from "../shared/components/TextField";

interface IPersonState {
  name: string;
  lastName: string;
  email: string;
  objective: string;
  height: number;
  weight: number;
  fat: number;
  muscle: number;
  water: number;
  numberOfRutines: number;
  numberOfWeeks: number;
  routinesFocuses: string[];
}

interface IObjective {
  name: string;
}
const objectives: Array<IObjective> = [{ name: 'Tren superior' }, { name: 'Tren inferior' }, { name: 'Cardio' }];

interface IRoutineFocus {
  name: string;
  id: number;
}
const routinesfocus: Array<IRoutineFocus> = [{name: 'Enfoque 1', id: 1}, {name: 'Enfoque 2', id: 2}, {name: 'Enfoque 3', id: 3}, ];

const useStyles = createUseStyles({
  container: {
    "margin": "15px"
  }
})

export const PersonRecord: React.FunctionComponent = () => {
  const [state, setState] = useState<IPersonState>({
    name: '',
    lastName: '',
    email: '',
    objective: '',
    height: 0,
    weight: 0,
    fat: 0,
    muscle: 0,
    water: 0,
    numberOfRutines: 1,
    numberOfWeeks: 1,
    routinesFocuses: []
  });
  const routines = Array.from(Array(state.numberOfRutines).keys());

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'numberOfRutines') {
      value = parseInt(value);
    }
    setState({
      ...state,
      [propName]: value,
    });
  }

  const classes = useStyles();
  console.log(routines);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <CustomTextField label="Nombre" value={state.name} onChange={onPropChange('name')} placeholder="Juan"></CustomTextField>
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="formatted-text-mask-input">Cantidad de semanas</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "1", min: 1}}
            value={state.numberOfWeeks}
            onChange={onPropChange('numberOfWeeks')}
            endAdornment={<InputAdornment position="end">{ state.numberOfWeeks == 1 ? 'semana' : 'semanas'}</InputAdornment>}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <CustomTextField label="Apellidos" value={state.lastName} onChange={onPropChange('lastName')} placeholder="Cambronero"></CustomTextField>
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="formatted-text-mask-input">Cantidad de rutinas</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "1", min: 1}}
            value={state.numberOfRutines}
            onChange={onPropChange('numberOfRutines')}
            endAdornment={<InputAdornment position="end">{ state.numberOfRutines == 1 ? 'día' : 'días'}</InputAdornment>}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <CustomTextField label="Correo" value={state.email} onChange={onPropChange('email')} placeholder="sample@mail.com"></CustomTextField>
        </Grid>
        <Grid item xs={6} >
          {
            routines.map((routine, index) => {
              return (
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={state.routinesFocuses[index]}
                  onChange={onPropChange('routinesFocuses')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Seleccione un objetivo
                  </MenuItem>
                  {
                    routinesfocus.map((focus) => {
                      return <MenuItem value={focus.id}>{focus.name}</MenuItem>
                    })
                  }
                </Select>
              )
            })
          }
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6} >
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={state.objective}
            onChange={onPropChange('objective')}
            inputProps={{ 'aria-label': 'Without label' }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccione un objetivo
            </MenuItem>
            {
              objectives.map((objective) => {
                return <MenuItem value={objective.name}>{objective.name}</MenuItem>
              })
            }
          </Select>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <InputLabel htmlFor="formatted-text-mask-input">Estatura</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.height}
            onChange={onPropChange('height')}
            endAdornment={<InputAdornment position="end">m</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3}>
          <InputLabel htmlFor="formatted-text-mask-input">Peso</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.weight}
            onChange={onPropChange('weight')}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <InputLabel htmlFor="formatted-text-mask-input">Grasa Corporal</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.fat}
            onChange={onPropChange('fat')}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3}>
          <InputLabel htmlFor="formatted-text-mask-input">Musculo</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.muscle}
            onChange={onPropChange('weight')}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
      <Grid item xs={3}>
          <InputLabel htmlFor="formatted-text-mask-input">Agua Corporal</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.water}
            onChange={onPropChange('water')}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
      </Grid>
    </>
  );
}