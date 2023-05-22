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
  // {
  //   // title: 'Main',
  //   baseUrl: '/admin',
  //   items: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       Icon: InboxIcon,
  //     },
  //   ],
  // },
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

const drawerWidth = 200;

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
    <div>
      <Toolbar>
        <Typography variant="h6" className="w-full text-center" color="primary">
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
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  selected={router.pathname === list.baseUrl + item.path}
                  onClick={() => {
                    router.push(list.baseUrl + item.path);
                    setOpen(false);
                  }}
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
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
      {user?.isAdmin &&
        (!isAdmin() ? (
          <ListItemButton
            onClick={() => {
              router.push('/admin');
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary={'Admin Panel'} />
          </ListItemButton>
        ) : (
          <ListItemButton
            onClick={() => {
              router.push('/dashboard');
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'User Panel'} />
          </ListItemButton>
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
