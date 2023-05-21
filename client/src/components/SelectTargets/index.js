import { Paper, Container, Typography, Box, Button } from '@mui/material';
import { useQuery } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';

import { get } from '@/utils/API/request';
import SearchInput from '../SearchInput';
import GroupCard from './GroupCard';
import { getUserGroups } from '@/utils/API/common';
import FullLoader from '../FullLoader';

async function searchUserByRollNumber(value) {
  const { data } = await get(`/admin/user/getUsers?q=${value}`);
  return data.data;
}

export default function SelectTargets() {
  const [target, setTarget] = useState({
    groups: [],
    include: [],
    exclude: [],
  });

  let { isLoading, data: userGroups } = useQuery({
    queryKey: ['userGroups'],
    queryFn: getUserGroups,
    staleTime: 1000 * 60 * 60 * 24,
  });

  function addGroup() {
    if (
      target.groups.length > 0 &&
      Object.values(target.groups[target.groups.length - 1]).includes('')
    )
      return;

    setTarget((prev) => {
      let next = {
        ...prev,
        groups: [
          ...prev.groups,
          {
            year: '',
            program: '',
            minCGPA: '',
            minCredits: '',
          },
        ],
      };
      return next;
    });
  }

  if (isLoading) return <FullLoader />;
  return (
    <Container maxWidth="xl" className="m-0 p-0">
      <Paper className="p-4 flex flex-col gap-2">
        <Typography variant="subtitle1">Include Groups</Typography>
        <Box
          elevation={2}
          className="p-2 mt-1 grid gap-2 grid-cols-1 md:auto-rows-fr sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
        >
          {target.groups.map((_, i) => (
            <GroupCard
              target={target}
              setTarget={setTarget}
              userGroups={userGroups}
              key={i}
              index={i}
            />
          ))}
          <Button
            variant="outlined"
            className="border-dashed"
            onClick={addGroup}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Box>
        <SearchInput queryFn={searchUserByRollNumber} />
      </Paper>
    </Container>
  );
}
