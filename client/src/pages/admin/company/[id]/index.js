import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  FormControlLabel,
  Switch,
  Paper,
  Button,
  Container,
} from '@mui/material';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import DrawerHeader from '@/components/DrawerHeader';

export default function IndividualCompanyAdmin({ params }) {
  let companyData = {
    name: 'Google',
    logo: 'https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png',
    techStack: 'React;Node;MongoDB;Express',
    userStatus: 'Registered',
  };
  return (
    <>
      <Box
        className="flex flex-row items-start justify-start gap-4"
        fullWidth
        sx={{
          padding: 0,
        }}
      >
        <div className="flex flex-row w-full sm:flex-nowrap flex-wrap gap-4 justify-center sm:justify-start">
          <div className="flex sm:flex-col flex-row gap-2 justify-start items-center">
            <Box
              className="h-40 sm:w-40 w-full sm:m-0"
              sx={{
                padding: 0,
              }}
            >
              <img
                src={companyData.logo}
                className="object-contain w-full h-full rounded-md"
                alt="Google"
              />
            </Box>
            <Box className="flex justify-evenly flex-col">
              <Typography
                className="text-2xl font-semibold text-center mb-2"
                color={'primary'}
              >
                {companyData.name}
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Hidden"
              />
            </Box>
          </div>
          <Divider
            orientation="vertical"
            flexItem
            className="hidden sm:block"
          />
          <Box className="flex-grow">
            <Typography
              className="text-xl font-semibold mt-2 ml-2"
              color={'primary'}
            >
              Current Status :
              <Chip
                label={companyData.userStatus || 'Not Registered'}
                sx={{
                  textTransform: 'capitalize',
                }}
                variant="outlined"
                color={
                  companyData.userStatus === 'Registered'
                    ? 'primary'
                    : companyData.userStatus === 'Shortlisted'
                    ? 'info'
                    : companyData.userStatus === 'Accepted'
                    ? 'success'
                    : companyData.userStatus === 'Rejected'
                    ? 'error'
                    : 'warning'
                }
                className="ml-2"
                icon={
                  <FiberManualRecordTwoToneIcon
                    sx={{
                      fontSize: '1rem',
                    }}
                  />
                }
              />
            </Typography>
          </Box>
        </div>
      </Box>
    </>
  );
}
