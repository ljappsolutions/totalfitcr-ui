import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Grid, TextField } from "@material-ui/core";
import { CustomTextField } from "../shared/components/TextField";

interface IPersonInformationState {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
}

export const PersonInformation: React.FunctionComponent = () => {
  const [state, setState] = useState<IPersonInformationState>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
  });
  const [errors, setErrors] = useState<any>({});

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

  const onPropChange = (propName: string) => (event: any) => {
    let value = event.target.value;
    setState({
      ...state,
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
      setState({
        ...state,
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
    setState({
      ...state,
      email: value
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
      setState({
        ...state,
        [propName]: value,
      });
    }
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
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
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
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
