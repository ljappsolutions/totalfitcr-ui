import React, { FunctionComponent } from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { Chip } from "@material-ui/core";
import { colors } from "../colors";
import { createUseStyles } from "react-jss";
import { getArrayFromNumber } from "../utils/arrays";
import classNames from "classnames";

const useStyles = createUseStyles({
  active: {
    backgroundColor: `${colors.red} !important`,
    color: `${colors.white} !important`
  },
});

interface IProps {
  numberOfRoutines: number;
  currentStep?: number;
}

export const CustomBreadcrumbs: FunctionComponent<IProps> = (props: IProps) => {
  const classes = useStyles();
  const { numberOfRoutines, currentStep } = props;
  const routines = getArrayFromNumber(numberOfRoutines);

  const isActive = (step: number) => {
    return classNames([
      {
        [classes.active]: currentStep === step,
      }
    ]);
  }

  return (
    <Breadcrumbs separator={<ArrowForwardOutlinedIcon fontSize="small" />}
      aria-label="breadcrumb">
      <Chip label="Formulario" className={isActive(1)} />
      {
        routines && routines.map(number => 
          <Chip key={`bc-${number}`}
            label={`Rutina día ${number + 1}`}
            className={isActive(number + 2)} />
        )
      }
      <Chip label="Revisión" className={isActive(numberOfRoutines + 2)} />
    </Breadcrumbs>
  );
};
