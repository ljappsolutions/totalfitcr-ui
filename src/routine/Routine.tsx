import { FunctionComponent } from "react";
import React from "react";
import { createUseStyles } from "react-jss";
import { Grid } from "@material-ui/core";
import { RoutineTemplates } from "./RoutineTemplates";
import { RoutineDetails } from "./RoutineDetails";

interface IRoutineProps {

}

const useStyles = createUseStyles({

});

export const Routine: FunctionComponent<IRoutineProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <RoutineTemplates />
      </Grid>
      <Grid item xs={9}>
        <RoutineDetails nbrOfWeeks={8} exercises={[
          'hamstring', 'quadriceps'
        ]}/>
      </Grid>
    </Grid>
  );
}
