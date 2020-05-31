import { useContext } from "react"
import { createUseStyles } from "react-jss";
import React from "react";
import { Grid, InputLabel, Input, InputAdornment } from "@material-ui/core";
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
})

export const PersonReview: React.FunctionComponent = () => {
  const context = useContext<IAppointmentContext | null>(AppointmentContext);
  const classes = useStyles();
  if (!context) return null;
  const { state, updatePersonReview } = context;

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    updatePersonReview({
      ...state.personReview,
      [propName]: value,
    });
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.column}>
          <InputLabel htmlFor="formatted-text-mask-input">Estatura</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.personReview.height}
            onChange={onPropChange('height')}
            endAdornment={<InputAdornment position="end">m</InputAdornment>}
          />
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <InputLabel htmlFor="formatted-text-mask-input">Peso</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.personReview.weight}
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
            value={state.personReview.fat}
            onChange={onPropChange('fat')}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <InputLabel htmlFor="formatted-text-mask-input">Musculo</InputLabel>
          <Input
            type="Number"
            inputProps={{ className: 'digitsOnly', step: "0.1" }}
            value={state.personReview.muscle}
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
            value={state.personReview.water}
            onChange={onPropChange('water')}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
      </Grid>
    </>
  )
}