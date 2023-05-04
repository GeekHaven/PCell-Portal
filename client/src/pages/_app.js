import '@/styles/globals.css';
import '@fontsource/ibm-plex-sans';
import '@fontsource/oswald';

import { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box, CircularProgress } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import NextNProgress from 'nextjs-progressbar';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import ThemeContext from '@/contexts/theme.context';
import Navbar from '@/components/Navbar';
import Drawer from '@/components/Drawer';
import { getTheme } from '@/utils/theme';
import DrawerHeader from '@/components/DrawerHeader';
import FullLoader from '@/components/FullLoader';
import { isUserAuthenticated } from '@/utils/API/auth';

const queryClient = new QueryClient();

function conditionalWrapper(condition, Parent, parentProps, Children) {
  if (condition) {
    return <Parent {...parentProps}>{Children}</Parent>;
  }
  return Children;
}

function AppContentWrapper({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  let { isLoading } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });

  return (
    <>
      <NextNProgress height={1} />
      {isLoading ? (
        <FullLoader />
      ) : (
        conditionalWrapper(
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
            {!Component.hideDrawer && <Drawer open={open} setOpen={setOpen} />}
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
        )
      )}
    </>
  );
}

export default function App({ Component, pageProps }) {
  let [mode, setMode] = useState('dark');
  let theme = useMemo(() => getTheme(mode), [mode]);

  function toggleTheme() {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContentWrapper Component={Component} pageProps={pageProps} />
          </ThemeProvider>
        </ThemeContext.Provider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}
