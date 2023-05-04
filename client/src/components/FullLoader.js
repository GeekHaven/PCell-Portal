import { Container, CircularProgress } from '@mui/material';

export default function FullLoader() {
  return (
    <Container
      maxWidth="xl"
      className="w-full h-screen flex justify-center items-center"
    >
      <CircularProgress />
    </Container>
  );
}
