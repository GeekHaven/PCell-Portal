import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import { useContext, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useQuery, useQueryClient } from 'react-query';

import { isUserAuthenticated } from '@/utils/API/auth';
import { logout } from '@/utils/API/request';
import ThemeContext from '@/contexts/theme.context';
import Logo from '@/assets/logo.svg';
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
      <Toolbar className={noSidebarMargin ? undefined : 'md:ml-[240px]'}>
        <Container
          maxWidth="xl"
          className="flex flex-row justify-between px-0 items-center"
        >
          {!noSidebarMargin && (
            <IconButton
              aria-label="Sidebar Toggle"
              aria-controls="sidebar-menu"
              size="large"
              color="primary"
              className="md:hidden mr-4"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box className="flex flex-row gap-2">
            <Image
              src={Logo.src}
              alt="Utkarsh Logo"
              width={32}
              height={32}
              className="cursor-pointer block md:hidden"
              onClick={() => {
                router.push('/');
              }}
            />
            <Image
              src={Logo.src}
              alt="Utkarsh Logo"
              width={40}
              height={40}
              className="cursor-pointer hidden md:block"
              onClick={() => {
                router.push('/');
              }}
            />
            <Typography
              variant="h1"
              fontFamily={'"Oswald", sans-serif;'}
              color="title"
              className="justify-self-center md:justify-self-start text-2xl block md:hidden cursor-pointer"
              onClick={() => {
                router.push('/');
              }}
            >
              Utkarsh
            </Typography>
            <Typography
              variant="h1"
              fontFamily={'"Oswald", sans-serif;'}
              color="title"
              className="justify-self-center md:justify-self-start text-4xl hidden md:block cursor-pointer"
              onClick={() => {
                router.push('/');
              }}
            >
              Utkarsh
            </Typography>
          </Box>
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
                  PaperProps={{
                    id: 'menu-list',
                  }}
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
                aria-label="Login Button"
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
            aria-label="User Actions"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
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
