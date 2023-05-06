import { Container } from 'postcss';
import React from 'react';
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

const Users = () => {
  return (
    <>
      <Container fixed className=" flex flex-col gap-8">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          //   type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {<Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </Container>
    </>
  );
};

export default Users;
