import { Avatar, Container, Typography, Chip, Paper } from '@mui/material';
import Image from 'next/image';
import react from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import moment from 'moment';

export const Notification = () => {
  return (
    <div>
      <Paper
        elevation={1}
        className="border-2 border-solid rounded-md py-1 px-2 gap-2"
        sx={{
          borderColor: 'divider',
        }}
      >
        <Container className="flex flex-col gap-1 p-2" maxWidth="xl">
          <Typography variant="h6">
            Amazon is not intrested in hiring today.
          </Typography>
          <Box className=" mb-2 flex flex-nowrap gap-2 items-center">
            <Avatar
              className="h-4 w-4"
              sx={{
                bgcolor: 'primary.main',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Mukesh Yadav
            </Typography>
            ·
            <Typography variant="caption" color="text.secondary">
              {moment(Date.now()).fromNow()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-3 sm:line-clamp-2"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            tempora beatae earum itaque nobis officia laudantium mollitia
            deserunt cupiditate deleniti vero ut qui nam corrupti a, assumenda
            alias optio! Expedita?
          </Typography>
          <Box className="flex flex-wrap gap-2 pt-2 pb-1">
            <Chip
              variant="outlined"
              label="Amazon"
              color="primary"
              className="font-semibold"
            />
            <Chip
              variant="outlined"
              label="Placement"
              color="primary"
              className="font-semibold"
            />
          </Box>
        </Container>
      </Paper>
    </div>
  );
};

export default Notification;
