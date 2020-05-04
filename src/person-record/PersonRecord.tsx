import { createUseStyles } from "react-jss";
import React, { useState } from "react";
import { Grid, Select, MenuItem, FilledInput, InputAdornment, Input, InputLabel, FormControlLabel, Checkbox, ListItemText, FormControl, TextField } from "@material-ui/core";
import { CustomTextField } from "../shared/components/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

interface IPersonState {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  objective: string;
  height: number;
  weight: number;
  fat: number;
  muscle: number;
  water: number;
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
    id: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    objective: '',
    height: 0,
    weight: 0,
    fat: 0,
    muscle: 0,
    water: 0,
    numberOfRoutines: 1,
    numberOfWeeks: 1,
    routinesFocuses: [],
    haveInjury: false,
    injuries: [],
    injuryNotes: ''
  });
  const routines = Array.from(Array(state.numberOfRoutines).keys());

  const [errors, setErrors] = useState<any>({});

  const onPropPhoneNumberChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'phoneNumber') {
      if (event.target.value.length == 8) {
        value = event.target.value;
        errors["phoneNumber"] = '';
      } else {
        errors["phoneNumber"] = "Número invalido."
        setErrors({ ...errors });
      }
      setState({
        ...state,
        [propName]: value,
      });
    }
  }

  const onPropIdChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'id') {
      if (event.target.value.length == 9) {
        value = event.target.value;
        errors["id"] = '';
      } else {
        errors["id"] = "Cédula invalida."
        setErrors({ ...errors });
      }
      setState({
        ...state,
        [propName]: value,
      });
    }
  }
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
  const onPropEmailChange = (event: any) => {
    let value = event.target.value;
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errors["email"] = 'Correo invalido';
      setErrors({ ...errors });
    } else {
      errors["email"] = '';
    }
    setState({
      ...state,
      email: value
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
  console.log(state.routinesFocuses);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
              <CustomTextField label="Nombre" value={state.name} onChange={onPropChange('name')} placeholder="Juan" required={true} ></CustomTextField>
              <span style={{ color: "red" }}>{errors["name"]}</span>
            </Grid>
            <Grid item xs={6} className={classes.column}>
              <CustomTextField label="Apellidos" value={state.lastName} onChange={onPropChange('lastName')} placeholder="Cambronero" required={true} ></CustomTextField>
              <span style={{ color: "red" }}>{errors["lastName"]}</span>
            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
              <CustomTextField label="Cédula" value={state.id} onChange={onPropIdChange('id')} placeholder="101000100" maxLength={9} required={true}  ></CustomTextField>
              <span style={{ color: "red" }}>{errors["id"]}</span>
            </Grid>
            <Grid item xs={6} className={classes.column}>
              <CustomTextField label="Correo" value={state.email} onChange={onPropEmailChange} placeholder="sample@mail.com" required={true} ></CustomTextField>
              <span style={{ color: "red" }}>{errors["email"]}</span>

            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
              <CustomTextField label="Número de Celular" value={state.phoneNumber} onChange={onPropPhoneNumberChange('phoneNumber')} placeholder="+506" maxLength={8} required={true} ></CustomTextField>
              <span style={{ color: "red" }}>{errors["phoneNumber"]}</span>
            </Grid>
            <Grid item xs={6} className={classes.column}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                value={state.birthday}
                onChange={onPropChange('birthday')}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
              <span style={{ color: "red" }}>{errors["birthday"]}</span>
            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
              <InputLabel htmlFor="formatted-text-mask-input">Estatura</InputLabel>
              <Input
                type="Number"
                inputProps={{ className: 'digitsOnly', step: "0.1" }}
                value={state.height}
                onChange={onPropChange('height')}
                endAdornment={<InputAdornment position="end">m</InputAdornment>}
              />
            </Grid>
            <Grid item xs={6} className={classes.column}>
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
            <Grid item xs={6} className={classes.column}>
              <InputLabel htmlFor="formatted-text-mask-input">Grasa Corporal</InputLabel>
              <Input
                type="Number"
                inputProps={{ className: 'digitsOnly', step: "0.1" }}
                value={state.fat}
                onChange={onPropChange('fat')}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </Grid>
            <Grid item xs={6} className={classes.column}>
              <InputLabel htmlFor="formatted-text-mask-input">Musculo</InputLabel>
              <Input
                type="Number"
                inputProps={{ className: 'digitsOnly', step: "0.1" }}
                value={state.muscle}
                onChange={onPropChange('muscle')}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column}>
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