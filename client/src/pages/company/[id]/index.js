import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Paper,
  Button,
  Container,
} from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';

import DrawerHeader from '@/components/DrawerHeader';

const IndividualCompany = ({ params }) => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 3,
        }}
        className="w-full md:ml-[200px]"
      >
        <DrawerHeader />
        <Box
          className="flex flex-row items-start justify-start gap-4"
          fullWidth
          sx={{
            padding: 0,
          }}
        >
          <div className="flex flex-row w-full flex-wrap gap-4 justify-start">
            <div className="flex sm:flex-col flex-row gap-2 justify-start items-center">
              <Box
                className="h-40 sm:w-40 w-full sm:m-0"
                sx={{
                  padding: 0,
                }}
              >
                <img
                  src={
                    'https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png'
                  }
                  className="object-contain w-full h-full rounded-md"
                  alt="Google"
                />
              </Box>
              <Typography className="text-2xl font-semibold" color={'primary'}>
                Google
              </Typography>
            </div>
            <Divider orientation="vertical" flexItem />
            <Box className="flex flex-col gap-2 flex-grow">
              <Typography className="text-2xl font-semibold" color={'primary'}>
                Tech Stack :
              </Typography>
              <Box className="flex flex-wrap gap-2 mb-2">
                <Chip
                  label={'Web Development'}
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.secondary',
                  }}
                />
                <Chip
                  label={'Web Development'}
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.secondary',
                  }}
                />
                <Chip
                  label={'Web Development'}
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.secondary',
                  }}
                />
              </Box>
              <Divider fullWidth />
              <Typography className="text-2xl font-semibold" color={'primary'}>
                Status :
              </Typography>
              <Typography
                className="text-xl font-semibold mt-2 ml-2"
                color={'primary'}
              >
                Company :
                <Chip
                  label={'Registration Open'}
                  variant="outlined"
                  color="secondary"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Registration Closed'}
                  variant="outlined"
                  color="warning"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Shortlisting'}
                  variant="outlined"
                  color="info"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Completed'}
                  variant="outlined"
                  color="success"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
              </Typography>
              <Typography
                className="text-xl font-semibold mt-2 ml-2"
                color={'primary'}
              >
                User :
                <Chip
                  label={'Registered'}
                  variant="outlined"
                  color="secondary"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Not Registered'}
                  variant="outlined"
                  color="warning"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Shortlisted'}
                  variant="outlined"
                  color="info"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Accepted'}
                  variant="outlined"
                  color="success"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
                <Chip
                  label={'Rejected'}
                  variant="outlined"
                  color="error"
                  className="ml-2"
                  icon={<AdjustIcon />}
                />
              </Typography>
            </Box>
          </div>
        </Box>
      </Container>
      <Paper
        className="absolute bottom-0 w-full flex justify-end"
        sx={{
          borderRadius: 0,
          paddingX: [1, 4, 8],
          paddingY: [1, 2],
        }}
        elevation={2}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            width: ['100%', 'fit-content'],
          }}
        >
          Register
        </Button>
      </Paper>
    </>
  );
};

export async function getServerSideProps(context) {
  // will be passed to the page component as props
  return {
    props: {
      params: context.params,
    },
  };
}
IndividualCompany.isFullWidth = true;
export default IndividualCompany;
