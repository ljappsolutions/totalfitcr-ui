import { FunctionComponent, useEffect, useState } from "react";
import React from "react";
import { createUseStyles } from "react-jss";
import { Grid } from "@material-ui/core";
import { RoutineTemplateService } from "../shared/services/routine-template";
import { RoutineTemplate } from "../shared/models/routine-template";
import { TemplateBox } from "./TemplateBox";

interface IRoutineTemplatesProps {

}

const useStyles = createUseStyles({
  templateBoxList: {
    'list-style-type': 'none',
    padding: '0.2em'
  }
});

export const RoutineTemplates: FunctionComponent<IRoutineTemplatesProps> = (props) => {
  const classes = useStyles();
  const [templates, setTemplates] = useState<RoutineTemplate[]>();

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
        <Grid item xs={12}>My templates</Grid>
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
                      selectable={true} />
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
