import { Button } from '@material-ui/core';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../shared/colors';

const useStyles = createUseStyles({
  active: {
    "& button": {
      'background': colors.green,
    }
  },
  "nav-bar-menu": {
    "& a": {
      "text-decoration": "none",
      "& button": {
        color: colors.white,
      }
    },
  },
})

const NavBar: FunctionComponent = () => {
  const classes = useStyles();
  const getNavLinkfor = (title: string, route: string, exact: boolean = false) => (
    <NavLink activeClassName={classes.active} to={route} exact={exact}>
      <Button>
        {title}
      </Button>
    </NavLink>
  );

  return (
    <div className={classes["nav-bar-menu"]}>
      {getNavLinkfor('Inicio', '/', true)}
      {getNavLinkfor('Dashboard', '/dashboard')}
      {getNavLinkfor('Crear cita', '/appointment')}
      {getNavLinkfor('Usuarios', '/users')}
    </div>
  );
}

export default NavBar;
