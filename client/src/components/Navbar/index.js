import {
  AppBar,
  Container,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useContext, useState, useRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

import ThemeContext from '@/contexts/theme.context';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
  let { theme, toggleTheme } = useContext(ThemeContext);
  let [menuOpen, setMenuOpen] = useState(false);
  let [sideMenuOpen, setSideMenuOpen] = useState(false);
  let sideMenuRef = useRef(null);
  let menuRef = useRef(null);

  return (
    <AppBar
      position="fixed"
      color="background"
      className="fixed bg-none shadow-none backdrop-blur"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container
        maxWidth="xl"
        className="flex flex-row md:justify-between py-2 md:py-4 items-center"
      >
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          ref={sideMenuRef}
          onClick={() => setSideMenuOpen(true)}
          color="primary"
          className="md:hidden mr-4"
        >
          <MenuIcon />
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
          <MenuItem onClick={() => setSideMenuOpen(false)}>My Profile</MenuItem>
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
        <div className="flex-row justify-end items-center gap-4 hidden md:flex">
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
              <MenuItem onClick={() => setMenuOpen(false)}>My Profile</MenuItem>
              <MenuItem onClick={() => setMenuOpen(false)}>Logout</MenuItem>
            </Menu>
          </>
        </div>
      </Container>
    </AppBar>
  );
}
