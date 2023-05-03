import { AppBar, Container, Typography, Switch } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar
      color="background"
      className="fixed bg-none shadow-none backdrop-blur"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl" className="flex flex-row justify-between py-4">
        <Typography
          variant="h4"
          fontFamily={'"Oswald", sans-serif;'}
          color="title"
        >
          IIITA Placement Portal
        </Typography>
        <div className="flex flex-row"></div>
      </Container>
    </AppBar>
  );
}
