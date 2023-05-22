import {
  Avatar,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const AllCompanies = ({ companyData }) => {
  const router = useRouter();
  return (
    <Container
      className="grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
      maxWidth="xl"
    >
      {companyData.map((company) => (
        <Button
          variant="outlined"
          className="px-2 flex-col items-start justify-start w-full h-full"
          sx={{
            outlineColor: 'secondary.main',
          }}
          onClick={() => {
            router.push(`/company/${company.id}`);
          }}
        >
          <div className="flex flex-nowrap gap-4 items-center">
            <Avatar
              className="p-0"
              sx={{
                borderRadius: '2px',
              }}
              alt={company.companyName}
              src={company.imageUrl}
            />
            <Typography
              color="primary"
              variant="subtitle1"
              className="text-start"
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {company.companyName}
            </Typography>
          </div>
          <div className="w-full border-[0.5px] my-2 border-blue-400"></div>

          <div className="flex flex-start flex-wrap">
            {company.techStacks.split(';').map((tech) => (
              <Chip
                label={tech}
                variant="outlined"
                className="m-1"
                size="small"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.secondary',
                }}
              />
            ))}
          </div>
        </Button>
      ))}
    </Container>
  );
};

export async function getServerSideProps(context) {
  // will be passed to the page component as props
  let companyData = [
    {
      imageUrl:
        'https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png',
      companyName: 'Google',
      techStacks: 'Javascript;Golang;Mongo;Javascript;Golang',
      id: '1',
    },
    {
      imageUrl:
        'https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1632523695',
      companyName: 'Amazon',
      techStacks: 'Javascript;Golang;Mongo',
      id: '2',
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
      companyName: 'Microsoft',
      techStacks: 'Javascript;Golang;Mongo',
      id: '3',
    },
    {
      imageUrl:
        'https://w7.pngwing.com/pngs/733/607/png-transparent-nvidia-logo-geforce-intel-graphics-processing-unit-nvidia-electronics-text-computer-thumbnail.png',
      companyName: 'Nvidia',
      techStacks: 'Javascript;Golang;Mongo',
      id: '4',
    },
    {
      imageUrl:
        'https://w7.pngwing.com/pngs/280/326/png-transparent-logo-netflix-logos-and-brands-icon-thumbnail.png',
      companyName: 'Netflix',
      techStacks: 'Javascript;Golang;Mongo',
      id: '5',
    },
  ];

  return {
    props: {
      companyData,
    },
  };
}

export default AllCompanies;
