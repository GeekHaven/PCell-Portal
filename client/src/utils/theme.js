import { createTheme } from '@mui/material/styles';

export function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      title: '#0172E4',
      ...(mode === 'light'
        ? {
            primary: {
              main: '#017eff',
            },
            background: {
              default: '#fefeff',
              paper: '#fefeff',
            },
          }
        : {
            primary: {
              main: '#66b2ff',
            },
            background: {
              default: '#0B1829',
              paper: '#0B1829',
            },
          }),
    },
    typography: {
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
  });
}
