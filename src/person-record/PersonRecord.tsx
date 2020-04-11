import { createUseStyles } from "react-jss";
import React, { useState } from "react";
import { Grid, Select, MenuItem, FilledInput, InputAdornment, Input } from "@material-ui/core";
import { CustomTextField } from "../shared/components/TextField";

interface IPersonState {
  name: string;
  lastName: string;
  email: string;
  objective: string;
  height: number;
}

interface IObjective {
  name: string;
}

const objectives: Array<IObjective> = [{ name: 'Tren superior' }, { name: 'Tren inferior' }, { name: 'Cardio' }];

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
  });

  const onPropChange = (propName: string) => (event: any) => {
    setState({
      ...state,
      [propName]: event.target.value,
    });
  }

  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <CustomTextField label="Nombre" value={state.name} onChange={onPropChange('name')} placeholder="Juan"></CustomTextField>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <CustomTextField label="Apellidos" value={state.lastName} onChange={onPropChange('lastName')} placeholder="Cambronero"></CustomTextField>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <CustomTextField label="Correo" value={state.email} onChange={onPropChange('email')} placeholder="sample@mail.com"></CustomTextField>
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
        <Grid item xs={6}>
        <Input
            type="Number"
            inputProps={{className:'digitsOnly', step: "0.1"}}
            value={state.height}
            onChange={onPropChange('height')}
            endAdornment={<InputAdornment position="end">m</InputAdornment>}
            aria-describedby="filled-height-helper-text"
          />
        </Grid>
      </Grid>
    </>
  );
}