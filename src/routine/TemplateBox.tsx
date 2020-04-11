import React, { FunctionComponent } from "react";
import { createUseStyles } from "react-jss";
import { colors } from "../shared/colors";
import { RoutineTemplate } from "../shared/models/routine-template";

interface ITemplateBoxProps {
  template: RoutineTemplate;
  selectable: boolean;
}

const useStyles = createUseStyles({
  templateBox: {
    padding: '0.5em',
    '&:hover': {
      backgroundColor: colors.red,
      color: colors.white,
      cursor: 'pointer'
    }
  }
});

export const TemplateBox: FunctionComponent<ITemplateBoxProps> = (props) => {
  const classes = useStyles();
  const { template } = props;

  const addTemplate = () => {
    console.log(template);
  }

  return (
    <li className={classes.templateBox} onClick={addTemplate}>
      {template.name}
    </li>
  );
};
