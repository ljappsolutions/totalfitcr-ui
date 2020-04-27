import React, { FunctionComponent } from "react";
import { RoutineTemplate } from "../shared/models/routine-template";
import { useTemplateBoxStyles } from "./styles";

interface ITemplateBoxProps {
  template: RoutineTemplate;
  selectable: boolean;
  onDoubleClick: (template: RoutineTemplate) => void;
}

export const TemplateBox: FunctionComponent<ITemplateBoxProps> = (props) => {
  const classes = useTemplateBoxStyles();
  const { template } = props;

  const addTemplate = () => {
    props.onDoubleClick(template);
  }

  return (
    <li className={classes.templateBox} onDoubleClick={addTemplate}>
      {template.name}
    </li>
  );
};
