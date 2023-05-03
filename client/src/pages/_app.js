import '@/styles/globals.css';
import '@fontsource/ibm-plex-sans';
import '@fontsource/oswald';

import { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import ThemeContext from '@/contexts/theme.context';
import Navbar from '@/components/Navbar';
import { getTheme } from '@/utils/theme';

function conditionalWrapper(condition, Parent, parentProps, Children) {
  if (condition) {
    return <Parent {...parentProps}>{Children}</Parent>;
  }
  return Children;
}

export default function App({ Component, pageProps }) {
  let [mode, setMode] = useState('dark');
  let theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!Component.hideNavbar && <Navbar />}
          {conditionalWrapper(
            !Component.isFullWidth,
            Container,
            {
              maxWidth: 'xl',
            },
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
