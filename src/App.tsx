import React, { useEffect, FunctionComponent, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { config } from './aws-custom-exports';
import Amplify, { Hub, Auth } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';
import Navigation from "./navigation/Navigation";
import { Grid, TextField } from "@material-ui/core";
import { CustomTextField } from "./shared/components/TextField";
import { createUseStyles } from "react-jss";

Amplify.configure(config);

interface IAppProps extends RouteComponentProps {
  onStateChange: any;
  OAuthSignIn: () => any;
}

interface IAppState {
  authState: string;
  authData: any;
  authError: any;
}

const App: FunctionComponent<IAppProps> = (props: IAppProps) => {
  const [state, setState] = useState<IAppState>({
    authState: 'loading',
    authData: null,
    authError: null,
  });

  Hub.listen('auth', data => {
    switch (data.payload.event) {
      case 'signIn':
        setState({ ...state, authState: 'signedIn', authData: data.payload.data });
        break;
      case 'signIn_failure':
        setState({
          ...state,
          authState: 'signIn',
          authData: null,
          authError: data.payload.data,
        });
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setState({ ...state, authState: 'signedIn', authData: user });
      })
      .catch(e => {
        setState({ ...state, authState: 'signIn' });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { authState } = state;
  if (authState === 'loading') {
    return null;
  }
  if (authState === 'signIn') {
    props.OAuthSignIn();
    return null;
  }
  return (
    <Router>
      <Navigation>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/contacto">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  )
}

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

function Home() {
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

function About() {
  return (
    <div>
      <h2>Acerca de nosotros</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default withOAuth(App);
