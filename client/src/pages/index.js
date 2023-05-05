import Image from 'next/image';
import { Typography, Container, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useRouter } from 'next/router';

import useUser from '@/customHooks/useUser';
import vector from '@/assets/vectors/home.svg';
import SEO from '@/components/SEO';

export default function Home() {
  let router = useRouter();
  let { user } = useUser();
  return (
    <>
      <SEO
        title="Placements · IIITA"
        desc="Get your dream job! On the Placement Cell Online Portal of IIIT Allahabad."
        img={vector.src}
      />
      <div
        style={{
          height: '25vmax',
          aspectRatio: 1,
          position: 'absolute',
          left: '50%',
          top: '50%',
          translate: '-50% -50%',
          borderRadius: '50%',
          background: 'linear-gradient(to right, aquamarine, mediumpurple)',
          animation: 'rotate 20s infinite',
          opacity: 0.8,
        }}
      ></div>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: 2,
          backdropFilter: 'blur(8vmax)',
        }}
      ></div>
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Container
          maxWidth="xl"
          className="z-10 flex flex-grow items-center justify-center"
        >
          <div
            className="z-10 relative w-full flex-grow flex flex-col-reverse gap-12 p-2 md:p-16 md:gap-0 md:grid"
            style={{
              gridTemplateColumns: '6fr 5fr',
            }}
          >
            <div className="flex relative flex-col justify-center gap-4">
              <Typography
                variant="h3"
                fontWeight={700}
                color="primary"
                className="text-3xl text-center md:text-left md:text-5xl"
              >
                Get your dream job!
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                className="text-lg text-center md:text-left md:text-2xl"
              >
                On the Placement Cell Online Portal of IIIT Allahabad.
              </Typography>
              <Button
                variant="contained"
                className="mx-auto md:mx-0  md:w-fit flex items-center"
                endIcon={<ArrowRightAltIcon />}
                onClick={() => {
                  if (!user) return router.push('/login');
                  return router.push('/dashboard');
                }}
              >
                Get Started
              </Button>
            </div>
            <Image src={vector} className="m-auto" />
          </div>
        </Container>
        <Container
          className="z-10 w-full h-5"
          maxWidth="3xl"
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
            color: 'text.disabled',
            fontSize: '0.8rem',
            backgroundColor: 'bgclear',
            backdropFilter: 'blur(10px)',
          }}
        >
          Created by Team GeekHaven
        </Container>
      </div>
    </>
  );
}

Home.hideDrawer = true;
Home.isFullWidth = true;
