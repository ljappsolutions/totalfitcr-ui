import React, { useState, FunctionComponent } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { UserService } from "../services/user";
import { IPersonInformationState } from "../models/person/person-information";

interface IProps {
  selectUser: (option: IPersonInformationState) => void
  user?: IPersonInformationState;
}

export const UserSearch: FunctionComponent<IProps> = (props) => {
  const { selectUser, user } = props;
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<IPersonInformationState[]>([]);
  const [value, setValue] = useState<IPersonInformationState | null>(user || null);

  React.useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    setOptions([]);
    const fetchData = async () => {
      const userService = new UserService();
      const users = await userService.find(inputValue);
      setOptions(users);
    }
    fetchData();
  }, [value, inputValue]);

  const getFullName = (option: IPersonInformationState) => `${option.name} ${option.lastName}`;

  return (
    <>
      <Autocomplete
        fullWidth
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        getOptionLabel={(option: IPersonInformationState) => getFullName(option)}
        renderInput={(params) => (
          <TextField {...params} label="Search user" variant="outlined" fullWidth />
        )}
        onChange={(event: any, newValue: IPersonInformationState | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          if (newValue)
            selectUser(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          if(newInputValue.length > 2)
            setInputValue(newInputValue);
        }}
        renderOption={(option: IPersonInformationState) => {
          console.log(parseInt(inputValue));
          if (!isNaN(parseInt(inputValue))) {
            return option.id;
          }
          return getFullName(option);
        }}
      />
    </>
  );
}