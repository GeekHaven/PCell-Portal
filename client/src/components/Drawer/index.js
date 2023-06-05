import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Link from 'next/link';

import { useRouter } from 'next/router';

import useUser from '@/customHooks/useUser';

const dashboardRoutes = [
  {
    baseUrl: '/dashboard',
    items: [
      {
        path: '',
        name: 'Inbox',
        Icon: InboxIcon,
      },
      {
        path: '/profile',
        name: 'Profile',
        Icon: AccountCircleIcon,
      },
    ],
  },
  {
    title: 'Companies',
    baseUrl: '/company',
    items: [
      {
        path: '',
        name: 'All',
        Icon: StoreIcon,
      },
      {
        path: '/registered',
        name: 'Registered',
        Icon: LocationCityIcon,
      },
    ],
  },
];

const adminRoutes = [
  {
    title: 'Companies',
    baseUrl: '/admin/company',
    items: [
      {
        path: '',
        name: 'All Companies',
        Icon: StoreIcon,
      },
      {
        path: '/new',
        name: 'Add Company',
        Icon: AddBusinessIcon,
      },
    ],
  },
  {
    title: 'Posts',
    baseUrl: '/admin/post',
    items: [
      {
        path: '',
        name: 'All Posts',
        Icon: StoreIcon,
      },
      {
        path: '/new',
        name: 'New Post',
        Icon: AddBusinessIcon,
      },
    ],
  },
  {
    // title: 'Users',
    baseUrl: '/admin/users',
    items: [
      {
        path: '',
        name: 'All Users',
        Icon: AccountCircleIcon,
      },
    ],
  },
];

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const router = useRouter();
  const { user } = useUser();
  const { open, setOpen } = props;
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  function isAdmin() {
    if (router?.pathname.startsWith('/admin')) {
      return true;
    }
    return false;
  }

  const drawer = (
    <div id="sidebar-menu">
      <Toolbar>
        <Typography
          variant="h2"
          className="w-full text-xl text-center"
          color="primary"
        >
          {isAdmin() ? 'Admin' : 'Dashboard'}
        </Typography>
      </Toolbar>
      <Divider />
      {(isAdmin() ? adminRoutes : dashboardRoutes).map((list, index) => (
        <React.Fragment key={index}>
          <List>
            {list.title && (
              <ListSubheader disableSticky>{list.title}</ListSubheader>
            )}
            {list.items.map((item) => (
              <Link
                key={item.name}
                href={list.baseUrl + item.path}
                onClick={() => setOpen(false)}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    selected={router.pathname === list.baseUrl + item.path}
                  >
                    <ListItemIcon>
                      <item.Icon
                        color={
                          router.pathname === list.baseUrl + item.path
                            ? 'primary'
                            : undefined
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        color:
                          router.pathname === list.baseUrl + item.path
                            ? 'primary'
                            : undefined,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
      {user?.isAdmin &&
        (!isAdmin() ? (
          <Link href="/admin" onClick={() => setOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <VerifiedUserIcon />
              </ListItemIcon>
              <ListItemText primary={'Admin Panel'} />
            </ListItemButton>
          </Link>
        ) : (
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'User Panel'} />
            </ListItemButton>
          </Link>
        ))}
    </div>
  );

  return (
    <Box
      component="nav"
      className={`w-0 md:w-[${drawerWidth}px] flex-shrink md:flex-shrink-0`}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: false,
        }}
        color="background"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundImage: 'none',
          },
        }}
        className="md:hidden block"
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        className="md:block hidden"
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
