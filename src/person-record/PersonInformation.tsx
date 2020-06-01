import React, { useState, useContext } from "react";
import { createUseStyles } from "react-jss";
import { Grid, TextField } from "@material-ui/core";
import { CustomTextField } from "../shared/components/TextField";
import AppointmentContext, { IAppointmentContext } from "../shared/contexts/appointment";
import { IDynamic } from "../shared/models/dynamic";

interface IProps {
  errors: IDynamic | null
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

export const PersonInformation: React.FunctionComponent<IProps> = (props) => {
  const context = useContext<IAppointmentContext | null>(AppointmentContext);
  let [errors, setErrors] = useState<IDynamic>({});
  errors = {
    ...props.errors,
  }
  const classes = useStyles();
  if (!context) return null;
  const { state, updatePersonInformation } = context;

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    updatePersonInformation({
      ...state.personInformation,
      [propName]: value,
    });
  }

  const onPropIdChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'id') {
      if (event.target.value.length === 9) {
        value = event.target.value;
        errors["id"] = '';
      } else {
        errors["id"] = "Cédula invalida."
        setErrors({ ...errors });
      }
      updatePersonInformation({
        ...state.personInformation,
        [propName]: value,
      });
    }
  }

  const onPropEmailChange = (event: any) => {
    let value = event.target.value;
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errors["email"] = 'Correo invalido';
      setErrors({ ...errors });
    } else {
      errors["email"] = '';
    }
    updatePersonInformation({
      ...state.personInformation,
      email: value,
    });
  }

  const onPropPhoneNumberChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    if (propName === 'phoneNumber') {
      if (event.target.value.length === 8) {
        value = event.target.value;
        errors["phoneNumber"] = '';
      } else {
        errors["phoneNumber"] = "Número invalido."
        setErrors({ ...errors });
      }
      updatePersonInformation({
        ...state.personInformation,
        [propName]: value,
      });
    }
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.column}>
          <CustomTextField label="Nombre" value={state.personInformation.name} onChange={onPropChange('name')} placeholder="Juan" required={true} ></CustomTextField>
          <span style={{ color: "red" }}>{errors["name"]}</span>
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <CustomTextField label="Apellidos" value={state.personInformation.lastName} onChange={onPropChange('lastName')} placeholder="Cambronero" required={true} ></CustomTextField>
          <span style={{ color: "red" }}>{errors["lastName"]}</span>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.column}>
          <CustomTextField label="Cédula" value={state.personInformation.id} onChange={onPropIdChange('id')} placeholder="101000100" maxLength={9} required={true}  ></CustomTextField>
          <span style={{ color: "red" }}>{errors["id"]}</span>
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <CustomTextField label="Correo" value={state.personInformation.email} onChange={onPropEmailChange} placeholder="sample@mail.com" required={true} ></CustomTextField>
          <span style={{ color: "red" }}>{errors["email"]}</span>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.column}>
          <CustomTextField label="Número de Celular" value={state.personInformation.phoneNumber} onChange={onPropPhoneNumberChange('phoneNumber')} placeholder="+506" maxLength={8} required={true} ></CustomTextField>
          <span style={{ color: "red" }}>{errors["phoneNumber"]}</span>
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            value={state.personInformation.birthday}
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
    </>
  );
}
