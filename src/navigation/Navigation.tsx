import React, { FunctionComponent } from 'react';
import { Divider, Grid } from '@material-ui/core';
import SignOut from './SignOut';
import NavBar from './NavBar';
import { createUseStyles } from 'react-jss';
import { colors } from '../shared/colors';

interface INavigationProps {
  children: any;
}

const useStyles = createUseStyles({
  navBarTitle: {
    "& h1": {
      "color": colors.white,
      "font-size": "48px",
    }
  },
  navBarContainer: {
    "background-color": colors.red,
    "padding": "0 15px",
  },
  container: {
    "padding": "15px"
  }
})

const Navigation: FunctionComponent<INavigationProps> = (props: INavigationProps) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
        <Grid
          container={true}
          className={classes.navBarContainer}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid className={classes.navBarTitle} item={true} xs={12} sm={6}>
            <h1>Total Fit CR</h1>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <SignOut />
          </Grid>
          <Grid item={true} xs={12}>
            <NavBar />
          </Grid>
        </Grid>
        <Divider
          style={{
            height: 2,
            border: 5,
            boxShadow: `0 1px 4px -14px #8c8c8c inset`,
          }}
        />
        <Grid container className={classes.container}>
          {children}
        </Grid>
      </>
  )
}

export default Navigation;
