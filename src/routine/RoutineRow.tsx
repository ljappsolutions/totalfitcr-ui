import React, { FunctionComponent } from "react";
import { createUseStyles } from "react-jss";
import { Grid } from "@material-ui/core";

interface IRoutineRowProps {
  nbrOfWeeks: number;
  exercise: string;
}

const useStyles = createUseStyles({
});

export const RoutineRow: FunctionComponent<IRoutineRowProps> = (props) => {
  const classes = useStyles();
  const { nbrOfWeeks, exercise } = props;
  const weeks = Array.from(Array(nbrOfWeeks).keys());
  console.log(weeks);

  return (
    <Grid container>
      <div>{exercise}</div>
      {
        weeks.map((week) =>
          <div>Something</div>)
      }
    </Grid>
  );
}
