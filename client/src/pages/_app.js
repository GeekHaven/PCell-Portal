import '@/styles/globals.css';
import '@fontsource/ibm-plex-sans';
import '@fontsource/oswald';

import { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import ThemeContext from '@/contexts/theme.context';
import Navbar from '@/components/Navbar';
import Drawer from '@/components/Drawer';
import { getTheme } from '@/utils/theme';
import DrawerHeader from '@/components/DrawerHeader';

function conditionalWrapper(condition, Parent, parentProps, Children) {
  if (condition) {
    return <Parent {...parentProps}>{Children}</Parent>;
  }
  return Children;
}

export default function App({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  let [mode, setMode] = useState('dark');
  let theme = useMemo(() => getTheme(mode), [mode]);

  function toggleTheme() {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {conditionalWrapper(
            !Component.hideContainer,
            Box,
            {
              sx: {
                display: 'flex',
              },
            },
            <>
              {!Component.hideNavbar && (
                <Navbar
                  open={open}
                  setOpen={setOpen}
                  noSidebarMargin={Component.hideDrawer}
                />
              )}
              {!Component.hideDrawer && (
                <Drawer open={open} setOpen={setOpen} />
              )}
              {conditionalWrapper(
                !Component.isFullWidth,
                Container,
                {
                  maxWidth: 'xl',
                  sx: {
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    p: 3,
                  },
                  className: 'w-full md:ml-[200px]',
                },
                <>
                  {!Component.isFullWidth && !Component.hideNavbar && (
                    <DrawerHeader />
                  )}
                  <Component {...pageProps} />
                </>
              )}
            </>
          )}
        </ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
