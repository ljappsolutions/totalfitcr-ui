import { TextField } from "@material-ui/core";
import React, { FunctionComponent } from "react";
interface IProps
{
  value: any;
  onChange: any;
  placeholder: string;
  label?: string;
  variant?: "outlined" | "standard" | "filled";
}

export const CustomTextField: FunctionComponent<IProps> = (props: IProps) => {
  return (
    <TextField label={props.label ?? ""} 
          value={props.value} onChange={props.onChange} 
          placeholder={props.placeholder} 
          variant={props.variant ?? "outlined"}></TextField>
  );
}