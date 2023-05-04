import Image from 'next/image';
import {
  Container,
  Paper,
  IconButton,
  InputAdornment,
  Typography,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import vector from '@/assets/vectors/login.svg';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <Container className="flex flex-col justify-center items-center">
        <Paper
          component="form"
          className="flex flex-col w-full max-w-sm px-6 py-4"
          elevation={4}
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h5"
            className="w-full text-center font-semibold mb-2"
          >
            LDAP Login
          </Typography>
          <FormControl margin="dense" error={usernameError} required>
            <OutlinedInput
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value.length === 0) setUsernameError(true);
                else setUsernameError(false);
              }}
              fullWidth
              autoComplete="username"
            />
          </FormControl>

          <FormControl margin="dense" error={passwordError} required>
            <OutlinedInput
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length === 0) setPasswordError(true);
                else setPasswordError(false);
              }}
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            className="self-end my-1"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-2"
            fullWidth
            size="large"
          >
            Login
          </Button>
        </Paper>
      </Container>
      <Container
        className="hidden md:flex flex-col justify-center items-center"
        sx={{ bgcolor: 'primary.main' }}
      >
        <Image src={vector} alt="Login" />
      </Container>
      <Container
        className="absolute w-full bottom-0"
        maxWidth="3xl"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          color: 'text.disabled',
          fontSize: '0.8rem',
          backgroundColor: 'bgclear',
          backdropFilter: 'blur(10px)',
        }}
      >
        Created by Team GeekHaven
      </Container>
    </div>
  );
}
Login.hideDrawer = true;
Login.isFullWidth = true;
