import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from '@mui/material/utils';
import { useEffect, useMemo } from 'react';

export default function SearchUserInput({
  queryFn,
  target,
  value,
  setValue,
  label,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const loading = open && options.length === 0;

  let getUserList = useMemo(
    () =>
      debounce(async (callback) => {
        return callback(await queryFn(inputValue));
      }, 250),
    [inputValue, target]
  );

  useEffect(() => {
    getUserList((opt) => {
      setOptions(opt);
    });
  }, [inputValue, target]);

  return (
    <Autocomplete
      multiple
      value={value}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => `${option.name}(${option.rollNumber})`}
      noOptionsText="No Users"
      filterSelectedOptions
      isOptionEqualToValue={(o, v) => o.rollNumber === v.rollNumber}
      autoHighlight
      includeInputInList
      autoComplete
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
