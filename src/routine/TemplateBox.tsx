import React, { FunctionComponent } from "react";
import { RoutineTemplate } from "../shared/models/routine-template";
import { useTemplateBoxStyles } from "./styles";
import { Exercise } from "../shared/models/exercise";

interface ITemplateBoxProps {
  template: RoutineTemplate | Exercise;
  selectable: boolean;
  onDoubleClick: (template: RoutineTemplate | Exercise) => void;
}

export const TemplateBox: FunctionComponent<ITemplateBoxProps> = (props) => {
  const classes = useTemplateBoxStyles();
  const { template } = props;

  const addOption = () => {
    props.onDoubleClick(template as RoutineTemplate);
  }

  return (
    <li className={classes.templateBox} onDoubleClick={addOption}>
      {template.name}
    </li>
  );
};
