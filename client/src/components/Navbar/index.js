import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useQuery, useQueryClient } from 'react-query';

import { isUserAuthenticated } from '@/utils/API/auth';
import { logout } from '@/utils/API/request';
import ThemeContext from '@/contexts/theme.context';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar({ open, setOpen, noSidebarMargin }) {
  let router = useRouter();
  let { theme, toggleTheme } = useContext(ThemeContext);
  let [menuOpen, setMenuOpen] = useState(false);
  let [sideMenuOpen, setSideMenuOpen] = useState(false);
  let sideMenuRef = useRef(null);
  let menuRef = useRef(null);
  let { data: user } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });
  let queryClient = useQueryClient();

  function handleLogout() {
    logout();
    queryClient.invalidateQueries('user');
  }

  return (
    <AppBar
      open={open}
      position="fixed"
      className="fixed bg-none shadow-none"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'bgclear',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar className={noSidebarMargin ? undefined : 'md:ml-[200px]'}>
        <Container
          maxWidth="xl"
          className="flex flex-row justify-between px-0 items-center"
        >
          {!noSidebarMargin && (
            <IconButton
              size="large"
              color="primary"
              className="md:hidden mr-4"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h5"
            fontFamily={'"Oswald", sans-serif;'}
            color="title"
            className="justify-self-center md:justify-self-start block md:hidden cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            IIITA Placement Portal
          </Typography>
          <Typography
            variant="h4"
            fontFamily={'"Oswald", sans-serif;'}
            color="title"
            className="justify-self-center md:justify-self-start hidden md:block cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            IIITA Placement Portal
          </Typography>
          <div className="flex-row justify-end items-center gap-2 hidden md:flex">
            <ThemeSwitch
              checked={theme.palette.mode === 'dark'}
              onClick={toggleTheme}
            />
            {user ? (
              <>
                <Button
                  color="primary"
                  className="text-lg"
                  endIcon={<ArrowDropDownIcon />}
                  ref={menuRef}
                  aria-controls={menuOpen ? 'menu-list' : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? 'true' : undefined}
                  onClick={() => setMenuOpen(true)}
                >
                  {user.rollNumber}
                </Button>
                <Menu
                  anchorEl={menuRef.current}
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      router.push('/dashboard/profile');
                      setMenuOpen(false);
                    }}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                className="normal-case font-semibold tracking-wider border-2"
                onClick={() => {
                  router.push('/login');
                }}
              >
                Log In
              </Button>
            )}
          </div>
          <IconButton
            size="large"
            color="primary"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            ref={sideMenuRef}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            className="md:hidden"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={sideMenuRef.current}
            open={sideMenuOpen}
            onClose={() => setSideMenuOpen(false)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem>
              Theme
              <ThemeSwitch
                sx={{ ml: 1 }}
                small
                checked={theme.palette.mode === 'dark'}
                onClick={toggleTheme}
              />
            </MenuItem>
            {user ? (
              [
                <MenuItem
                  onClick={() => {
                    router.push('/dashboard/profile');
                    setSideMenuOpen(false);
                  }}
                  key="profile"
                >
                  My Profile
                </MenuItem>,
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    setSideMenuOpen(false);
                  }}
                  key="logout"
                >
                  Log Out
                </MenuItem>,
              ]
            ) : (
              <MenuItem
                onClick={() => {
                  router.push('/login');
                  setSideMenuOpen(false);
                }}
              >
                Log In
              </MenuItem>
            )}
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
