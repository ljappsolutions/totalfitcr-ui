import { useContext } from "react"
import { Grid, FormControlLabel, Checkbox, TextField, FormControl, InputLabel } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IInjury } from "../shared/models/injury";
import AppointmentContext, { IAppointmentContext } from "../shared/contexts/appointment";

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
});

const injuries: Array<IInjury> = [{ name: 'Tobillo Derecho', id: 1 }, { name: 'Tobillo Izquierdo', id: 2 }, { name: 'Rodilla Derecha', id: 3 }, { name: 'Rodilla Izquierda', id: 4 },];

export const PersonInjury: React.FunctionComponent = () => {
  const context = useContext<IAppointmentContext | null>(AppointmentContext);
  const classes = useStyles();
  if (!context) return null;
  const { state, updatePersonInjury } = context;
  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'haveInjury') {
      value = event.target.checked;
    }
    updatePersonInjury({
      ...state.personInjury,
      [propName]: value,
    });
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.column} >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.personInjury.haveInjury}
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
                state.personInjury.haveInjury && (
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
                state.personInjury.haveInjury && (
                  <TextField
                    id="outlined-multiline-static"
                    label="Notas"
                    value={state.personInjury.injuryNotes}
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
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  )
}