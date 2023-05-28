import '@/styles/globals.css';
import '@fontsource/ibm-plex-sans';
import '@fontsource/oswald';

import { useMemo, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Box } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { SnackbarProvider } from 'notistack';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import ThemeContext from '@/contexts/theme.context';
import Navbar from '@/components/Navbar';
import Drawer from '@/components/Drawer';
import { getTheme } from '@/utils/theme';
import DrawerHeader from '@/components/DrawerHeader';
import FullLoader from '@/components/FullLoader';
import { isUserAuthenticated } from '@/utils/API/auth';
import { getLS, storeLS } from '@/utils/localStorage';

const queryClient = new QueryClient();

function conditionalWrapper(condition, Parent, parentProps, Children) {
  if (condition) {
    return <Parent {...parentProps}>{Children}</Parent>;
  }
  return Children;
}

function AppContentWrapper({ Component, pageProps }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  let { data: user, isLoading } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });

  useEffect(() => {
    if (!isLoading) {
      if (router.asPath.startsWith('/dashboard')) {
        if (!isLoading && !user) {
          router.push('/login');
        }
      }
      if (router.asPath.startsWith('/admin')) {
        if (!isLoading && !user.isAdmin) {
          router.push('/login');
        }
      }
    }
  }, [router, user]);

  return (
    <>
      <NextNProgress height={1} />
      {isLoading ? (
        <Container
          maxWidth="xl"
          className="w-full h-screen flex justify-center items-center"
        >
          <FullLoader />
        </Container>
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
                className: 'w-full md:ml-[240px]',
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
    storeLS('mode', mode === 'dark' ? 'light' : 'dark', true);
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    let lsMode = getLS('mode');
    if (lsMode) {
      setMode(lsMode);
    } else {
      storeLS('mode', mode, true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
              <AppContentWrapper Component={Component} pageProps={pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}
