import React, { useState } from 'react';
import {
  IconButton,
  Container,
  Typography,
  Tooltip,
  TextField,
  Box,
  ToggleButton,
  Button,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import { styled } from '@mui/material/styles';

const Dashboard = () => {
  const cgpaValue = 6.9;
  const [mobile, setMobile] = useState(false);
  const [resumeLink, setResumeLink] = useState(false);

  return (
    <>
      <Container fixed className=" flex flex-col gap-8">
        <Container
          className="flex flex-wrap justify-between items-center"
          sx={{
            borderBottom: '2px solid',
            borderColor: 'divider',
            paddingY: '16px',
            paddingX: '8px',
          }}
        >
          <Typography variant="h4" className="hidden md:block">
            My Profile
          </Typography>
          <Typography variant="h5" className="md:hidden block">
            My Profile
          </Typography>
          <Tooltip title="Update Details">
            <IconButton>
              <CachedIcon className="text-2xl" />
            </IconButton>
          </Tooltip>
        </Container>
        <Container className="flex flex-wrap jutify-around items-center">
          <TextField
            disabled
            label="Name"
            defaultValue="Pagadala Laxmi Venkata Bhavan Naryana"
            fullWidth
          />
        </Container>
        <Container className="flex flex-wrap justify-between items-center gap-4 ">
          <TextField
            disabled
            label="Enrollment Number"
            defaultValue="IEC2021048"
            className="md:basis-[30%] sm:basis-[40%] basis-full"
          />
          <Box
            className="flex flex-row flex-nowrap gap-2 rounded-lg border-solid  p-3.5 border-2 md:basis-[30%] sm:basis-[40%] basis-full"
            sx={{
              borderColor: 'divider',
              // width: '206.56px',
            }}
          >
            <Typography variant="body1" className="font-medium">
              CGPA :
            </Typography>
            <Typography
              variant="body1"
              className="font-bold"
              color={
                cgpaValue === 6.9
                  ? '#FFD700'
                  : cgpaValue < 7
                  ? 'error.main'
                  : cgpaValue < 7.5
                  ? 'warning.main'
                  : 'success.main'
              }
            >
              {cgpaValue}
            </Typography>
          </Box>
          <Box
            className="flex flex-row flex-nowrap gap-2 rounded-md border-solid  py-3.5 px-2 border-2 md:basis-[30%] sm:basis-[40%] basis-full "
            sx={{
              borderColor: 'divider',
              // width: '206.56px',
            }}
          >
            <Typography variant="body1" className="font-medium">
              Credits:
            </Typography>
            <Typography variant="body1" className="font-bold" color="primary">
              64/140
            </Typography>
          </Box>
          {/* </Container>
        <Container className="flex flex-wrap justify-between items-center gap-4"> */}
          <TextField
            disabled
            label="Current Semester"
            defaultValue="Fifth"
            className="md:basis-[30%] sm:basis-[40%] basis-full"
          />
          <TextField
            disabled
            label="Admission Year"
            defaultValue="2021"
            className="md:basis-[30%] sm:basis-[40%] basis-full"
          />
          <TextField
            disabled
            label="Program"
            defaultValue="B.Tech (ECE)"
            className="md:basis-[30%] sm:basis-[40%] basis-full"
          />
        </Container>
        <Container className="flex flex-nowrap jutify-around items-center gap-2">
          <TextField
            disabled={!mobile}
            label="Mobile Number"
            defaultValue="8828065897"
            fullWidth
            focused={mobile}
          />

          <ToggleButton
            value="check"
            selected={mobile}
            onChange={() => {
              setMobile((mobile) => {
                if (mobile) {
                  return false;
                }
                setResumeLink(false);
                return true;
              });
            }}
            className="p-3.5"
          >
            <CreateIcon />
          </ToggleButton>
        </Container>
        <Container className="flex flex-nowrap jutify-around items-center gap-2">
          <TextField
            disabled={!resumeLink}
            label="Resume Link"
            defaultValue="google drive link"
            fullWidth
            focused={resumeLink}
          />

          <ToggleButton
            value="check"
            selected={resumeLink}
            onChange={() => {
              setResumeLink((resumeLink) => {
                if (resumeLink) {
                  return false;
                }
                setMobile(false);
                return true;
              });
            }}
            className="p-3.5"
          >
            <CreateIcon />
          </ToggleButton>
        </Container>
        <Container className="flex justify-end">
          <Button variant="contained" className="font-bold">
            Save Changes
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default Dashboard;
