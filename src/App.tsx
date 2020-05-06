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
import { PersonRecord } from "./person-record/PersonRecord";
import { PersonInformation } from "./person-record/PersonInformation";
import { PersonReview } from "./person-record/PersonReview";
import { PersonInjury } from "./person-record/PersonInjury";



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
          <Route path="/dashboard"></Route>
          <Route path="/person-record">
            <PersonInformation />
            <PersonReview />
            <PersonInjury />
            <PersonRecord />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Navigation>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
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
