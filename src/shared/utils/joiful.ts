import { ValidationResult } from "joiful";
import { IDynamic } from "../models/dynamic";

export const getErrorDetails = (joifulError: ValidationResult<any>) => {
  const error = joifulError.error;
  if(!error)
    return null;
  const errors = error.details.reduce((errors: IDynamic, details) => {
    if(details.context && details.context.key) {
      errors[details.context.key] = details.message;
    }
    return errors;
  }, {} as IDynamic);
  return errors;
}

export const areThereErrors = (joifulErrors: ValidationResult<any>[]) => {
  return joifulErrors.some(x => x.error);
}