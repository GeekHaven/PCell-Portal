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
import { useQuery, useMutation } from 'react-query';
import {
  getIndividualCompany,
  registerUserToCompany,
} from '@/utils/API/company';
import { getPublicIndividualCompany } from '@/utils/API/public/company';
import useUser from '@/customHooks/useUser';
import SEO from '@/components/SEO';

const IndividualCompany = ({ params }) => {
  const user = useUser();

  const fetchCompany = async (id) => {
    if (user.user) return getIndividualCompany(id);
    return getPublicIndividualCompany(id);
  };
  const {
    data: companyData,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useQuery(['company', params.id], () => fetchCompany(params.id), {
    enabled: !!params.id,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: registerUser, isLoading: isRegistering } = useMutation(
    registerUserToCompany,
    {
      onSuccess: async (data) => {
        refetch();
      },
      onError: async (err) => {
        console.log(err);
      },
    }
  );

  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }
  return (
    <>
      <SEO
        title={`${companyData.name} | Placement Cell IIIT Allahabad`}
        desc={`${companyData.name} | Placement Cell IIIT Allahabad`}
        img={companyData.logo}
      />
      <Container
        maxWidth="xl"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 3,
        }}
        className={`w-full ${user.user ? 'md:ml-[240px]' : ''}`}
      >
        <DrawerHeader />
        <Box
          className="flex flex-row items-start justify-start gap-4"
          sx={{
            padding: 0,
          }}
        >
          <div className="flex sm:flex-row flex-col w-full sm:flex-nowrap flex-wrap gap-4 justify-center sm:justify-start">
            <div className="flex sm:flex-col flex-row gap-2 justify-evenly items-center">
              <Box
                className="h-40 w-40 sm:m-0 rounded-md"
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
              <Divider className="block sm:hidden mb-2" />
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
                  <Divider className="my-4" />
                </>
              )}

              {user.user && (
                <Typography
                  component="div"
                  className="text-xl font-semibold mt-2 ml-2"
                  color={'primary'}
                >
                  Application Status :
                  <Chip
                    label={
                      companyData.currentStatus === 'completed' &&
                      companyData.userStatus !== 'selected'
                        ? 'rejected'
                        : companyData.userStatus || 'not registered'
                    }
                    sx={{
                      // \
                      textTransform: 'capitalize',
                    }}
                    variant="outlined"
                    color={
                      companyData.userStatus === 'registered'
                        ? 'primary'
                        : companyData.userStatus === 'shortlisted'
                        ? 'info'
                        : companyData.userStatus === 'selected'
                        ? 'success'
                        : companyData.currentStatus === 'completed'
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
              )}
            </Box>
          </div>
        </Box>
      </Container>
      {user.user && (
        <Paper
          className={`absolute bottom-0 w-full flex justify-end ${
            // (companyData.currentStatus === 'completed' &&
            //   !companyData.isSelected) ||
            companyData.userStatus ||
            companyData.currentStatus !== 'registration open' ||
            companyData.isSelected
              ? 'hidden'
              : 'block'
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
            onClick={() => {
              registerUser(params.id);
            }}
          >
            Register
            {isRegistering && (
              <CircularProgress
                size={20}
                sx={{
                  marginLeft: 2,
                }}
              />
            )}
          </Button>
        </Paper>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}
IndividualCompany.isFullWidth = true;
export default IndividualCompany;
