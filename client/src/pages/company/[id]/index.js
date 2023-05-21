import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';

const IndividualCompany = ({ params }) => {
  return (
    <>
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
          <Box>
            <Typography className="text-2xl font-semibold" color={'primary'}>
              Tech Stack :
            </Typography>
            <Box className="flex flex-wrap gap-2 mt-4">
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
          </Box>
        </div>
      </Box>
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
export default IndividualCompany;
