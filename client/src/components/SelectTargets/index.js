import { Paper, Container, Typography, Box } from '@mui/material';

import GroupCard from './GroupCard';

export default function SelectTargets() {
  return (
    <Container maxWidth="xl" className="m-0 p-0">
      <Paper className="p-4 flex flex-col gap-2">
        <Typography variant="subtitle1">Include Groups</Typography>
        <Box
          elevation={2}
          className="p-2 mt-1 grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
        >
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </Box>
      </Paper>
    </Container>
  );
}
