import React, { useState, FunctionComponent } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { UserService } from "../services/user";
import { PersonDetailsInfo } from "../models/person/person-details";

interface IProps {
  selectUser: (option: PersonDetailsInfo) => void
  user?: PersonDetailsInfo;
}

export const UserSearch: FunctionComponent<IProps> = (props) => {
  const { selectUser, user } = props;
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<PersonDetailsInfo[]>([]);
  const [value, setValue] = useState<PersonDetailsInfo | null>(user || null);

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

  const getFullName = (option: PersonDetailsInfo) => `${option.name} ${option.lastName}`;

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
        getOptionLabel={(option: PersonDetailsInfo) => getFullName(option)}
        renderInput={(params) => (
          <TextField {...params} label="Buscar usuario" variant="outlined" fullWidth />
        )}
        onChange={(event: any, newValue: PersonDetailsInfo | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          if (newValue)
            selectUser(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          if(newInputValue.length > 2)
            setInputValue(newInputValue);
        }}
        renderOption={(option: PersonDetailsInfo) => {
          if (!isNaN(parseInt(inputValue))) {
            return option.id;
          }
          return getFullName(option);
        }}
      />
    </>
  );
}