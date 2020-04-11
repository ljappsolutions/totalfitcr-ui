import { createUseStyles } from "react-jss";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { CustomTextField } from "../shared/components/TextField";

interface IPersonState {
  name: string;
  lastName: string;
  email: string;
}

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
    </>
  );
}