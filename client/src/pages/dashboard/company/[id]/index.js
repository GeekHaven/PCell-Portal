import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Paper,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import DrawerHeader from '@/components/DrawerHeader';
import { useQuery } from 'react-query';
import { getIndividualCompany } from '@/utils/API/company';

const IndividualCompany = ({ params }) => {
  const {
    data: companyData,
    isLoading,
    isError,
  } = useQuery(['company', params.id], () => getIndividualCompany(params.id), {
    enabled: !!params.id,
  });
  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

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
        className="w-full md:ml-[240px]"
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
                className="h-40 sm:w-40 w-full sm:m-0 rounded-md"
                sx={{
                  padding: 2,
                  bgcolor: 'white',
                }}
              >
                <img
                  src={companyData.logo}
                  className="object-cover w-full h-full rounded-md"
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
                <Chip
                  label={companyData.currentStatus}
                  variant="outlined"
                  color={
                    companyData.currentStatus === 'registration open'
                      ? 'secondary'
                      : companyData.currentStatus === 'registration closed'
                      ? 'warning'
                      : companyData.currentStatus === 'shortlisting'
                      ? 'primary'
                      : 'success'
                  }
                  className="ml-2 capitalize"
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
              {companyData.techStack && (
                <>
                  <Typography
                    className="text-2xl font-semibold mb-2"
                    color={'primary'}
                  >
                    Tech Stack :
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mb-2">
                    {companyData.techStack.split(';').map((tech) => (
                      <Chip
                        label={tech}
                        variant="outlined"
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.secondary',
                        }}
                        key={tech}
                      />
                    ))}
                  </Box>
                  <Divider fullWidth className="my-4" />
                </>
              )}

              <Typography
                className="text-xl font-semibold mt-2 ml-2"
                color={'primary'}
              >
                Application Status :
                <Chip
                  label={companyData.userStatus || 'Not Registered'}
                  sx={{
                    textTransform: 'capitalize',
                  }}
                  variant="outlined"
                  color={
                    companyData.userStatus === 'registered'
                      ? 'primary'
                      : companyData.userStatus === 'shortlisted'
                      ? 'info'
                      : companyData.userStatus === 'accepted'
                      ? 'success'
                      : companyData.userStatus === 'rejected'
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
      </Container>
      <Paper
        className={`absolute bottom-0 w-full flex justify-end ${
          companyData.userStatus ? 'hidden' : 'block'
        }`}
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
  // let companyData = {
  //   name: 'Google',
  //   logo: 'https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png',
  //   techStack: 'React;Node;MongoDB;Express',
  //   // userStatus: 'Registered',
  //   currentStatus: 'registration open',
  // };
  return {
    props: {
      params: context.params,
      // companyData,
    },
  };
}
IndividualCompany.isFullWidth = true;
export default IndividualCompany;
