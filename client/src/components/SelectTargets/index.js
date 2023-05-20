import { Paper, Container, Typography, Box } from '@mui/material';
import { get } from '@/utils/API/request';
import SearchInput from '../SearchInput';
import GroupCard from './GroupCard';

async function searchUserByRollNumber(value) {
  const { data } = await get(`/admin/user/getUsers?q=${value}`);
  return data.data;
}

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
        <SearchInput queryFn={searchUserByRollNumber} />
      </Paper>
    </Container>
  );
}
