import { useState } from "react"
import { createUseStyles } from "react-jss";
import React from "react";
import { Grid, InputLabel, Input, InputAdornment } from "@material-ui/core";

interface IPersonReview {
  height: number;
  weight: number;
  fat: number;
  muscle: number;
  water: number;
}

export const PersonReview: React.FunctionComponent = () => {
  const [state, setState] = useState<IPersonReview>({
    height: 0,
    weight: 0,
    fat: 0,
    muscle: 0,
    water: 0
  });

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    setState({
      ...state,
      [propName]: value,
    });
  }
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
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
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
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

    </>
  )
}