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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

import ThemeContext from '@/contexts/theme.context';
import ThemeSwitch from './ThemeSwitch';

const drawerWidth = 200;

export default function Navbar({ open, setOpen, noSidebarMargin }) {
  let { theme, toggleTheme } = useContext(ThemeContext);
  let [menuOpen, setMenuOpen] = useState(false);
  let [sideMenuOpen, setSideMenuOpen] = useState(false);
  let sideMenuRef = useRef(null);
  let menuRef = useRef(null);

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
          className="flex flex-row md:justify-between px-0 items-center"
        >
          {!noSidebarMargin && (
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              ref={sideMenuRef}
              onClick={() => setOpen(!open)}
              color="primary"
              className="md:hidden mr-4"
            >
              <MenuIcon />
            </IconButton>
          )}
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
            <MenuItem onClick={() => setSideMenuOpen(false)}>
              My Profile
            </MenuItem>
          </Menu>
          <Typography
            variant="h5"
            fontFamily={'"Oswald", sans-serif;'}
            color="title"
            className="justify-self-center md:justify-self-start block md:hidden"
          >
            IIITA Placement Portal
          </Typography>
          <Typography
            variant="h4"
            fontFamily={'"Oswald", sans-serif;'}
            color="title"
            className="justify-self-center md:justify-self-start hidden md:block"
          >
            IIITA Placement Portal
          </Typography>
          <div className="flex-row justify-end items-center gap-2 hidden md:flex">
            <ThemeSwitch
              checked={theme.palette.mode === 'dark'}
              onClick={toggleTheme}
            />
            {/* <Button
            variant="outlined"
            className="normal-case font-semibold tracking-wider border-2"
          >
            Log In
          </Button> */}
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
                IEC2021002
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
                <MenuItem onClick={() => setMenuOpen(false)}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => setMenuOpen(false)}>Logout</MenuItem>
              </Menu>
            </>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
