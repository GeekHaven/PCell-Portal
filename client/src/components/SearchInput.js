import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';

export default function Asynchronous({ queryFn }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [curValue, setCurValue] = React.useState('');

  useEffect(() => {
    queryFn(curValue).then((data) => {
      setOptions([...data]);
    });
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      limitTags={2}
      multiple
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        `${option.rollNumber}${option.name}` === value.rollNumber
      }
      getOptionLabel={(option) => option.rollNumber + ' ' + option.name}
      options={options}
      loading={loading}
      autoHighlight={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          value={curValue}
          onChange={(e) => {
            setCurValue(e.target.value);
          }}
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

