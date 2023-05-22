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
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
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
          <div className="flex flex-row w-full sm:flex-nowrap flex-wrap gap-4 justify-center sm:justify-start">
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
              <Box className="flex justify-evenly flex-col">
                <Typography
                  className="text-2xl font-semibold text-center mb-2"
                  color={'primary'}
                >
                  Google
                </Typography>
                <Chip
                  label={'Registration Closed'}
                  variant="outlined"
                  color="warning"
                  className="ml-2"
                  icon={
                    <FiberManualRecordTwoToneIcon
                      sx={{
                        fontSize: '1rem',
                      }}
                    />
                  }
                />
              </Box>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              className="hidden sm:block"
            />
            <Box className="flex-grow">
              <Divider fullWidth className="block sm:hidden mb-2" />
              <Typography
                className="text-2xl font-semibold mb-2"
                color={'primary'}
              >
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
              <Divider fullWidth className="my-4" />
              <Typography
                className="text-xl font-semibold mt-2 ml-2"
                color={'primary'}
              >
                User Status :
                <Chip
                  label={'Registered'}
                  variant="outlined"
                  color="secondary"
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
          color="primary"
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
