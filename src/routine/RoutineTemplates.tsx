import { FunctionComponent, useEffect, useState } from "react";
import React from "react";
import { Grid } from "@material-ui/core";
import { RoutineTemplateService } from "../shared/services/routine-template";
import { RoutineTemplate } from "../shared/models/routine-template";
import { TemplateBox } from "./TemplateBox";
import { useSelectorStyles } from "./styles";
import { Exercise } from "../shared/models/exercise";

interface IRoutineTemplatesProps {
  selectTemplate: (template: RoutineTemplate | Exercise) => void
}

export const RoutineTemplateSelector: FunctionComponent<IRoutineTemplatesProps> = (props) => {
  const classes = useSelectorStyles();
  const { selectTemplate } = props;
  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const routineTemplateService = new RoutineTemplateService();
      const response = await routineTemplateService.getRoutineTemplates();
      setTemplates(response);
    };
    fetchData();
  }, [templates]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>Mis plantillas</Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {
            templates && (
              <ul className={classes.templateBoxList}>
                {
                  templates.map(template => (
                    <TemplateBox template={template}
                      key={template.name}
                      selectable={true} 
                      onDoubleClick={selectTemplate}/>
                  ))
                }
              </ul>
            )
          }
        </Grid>
      </Grid>
    </>
  );
}
