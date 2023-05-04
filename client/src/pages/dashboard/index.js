import React from 'react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '@/utils/customAvatar';
import { Container } from '@mui/material';

const Dashboard = () => {
  return (
    <>
      <div className=" w-fit p-4 border-2 border-solid border-red-400 border-r-32">
        <Avatar {...stringAvatar('Pranav Tiwari')} />
      </div>
    </>
  );
};

export default Dashboard;
