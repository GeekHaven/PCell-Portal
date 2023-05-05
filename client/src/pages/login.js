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
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import { useRouter } from 'next/router';
import FullLoader from '@/components/FullLoader';
import { isUserAuthenticated, loginUser } from '@/utils/API/auth';
import vector from '@/assets/vectors/login.svg';
import SEO from '@/components/SEO';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const queryClient = useQueryClient();

  let { data: user, isLoading } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });

  const mutation = useMutation(
    (data) => loginUser(data.username, data.password, data.remember),
    {
      onSuccess: (data) => {
        delete data['token'];
        queryClient.setQueryData('user', data);
      },
    }
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password, remember });
  };

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [isLoading, user]);
  return (
    <>
      <SEO
        title="Login · Placements · IIITA"
        desc="Get your dream job! On the Placement Cell Online Portal of IIIT Allahabad."
        img={vector.src}
      />
      {isLoading ? (
        <FullLoader />
      ) : (
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
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value.length === 0) setUsernameError(true);
                    else setUsernameError(false);
                  }}
                  fullWidth
                  autoComplete="on"
                />
              </FormControl>

              <FormControl margin="dense" error={passwordError} required>
                <OutlinedInput
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.length === 0) setPasswordError(true);
                    else setPasswordError(false);
                  }}
                  fullWidth
                  autoComplete="on"
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

              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                className="mt-2"
                fullWidth
                size="large"
                loading={mutation.isLoading}
              >
                <span>Login</span>
              </LoadingButton>
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
      )}
    </>
  );
}
Login.hideDrawer = true;
Login.isFullWidth = true;
