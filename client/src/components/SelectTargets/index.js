import { Paper, Container, Typography, Box, Button } from '@mui/material';
import { useQuery } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
import { useState, useCallback } from 'react';

import { get } from '@/utils/API/request';
import SearchInput from './SearchUserInput';
import GroupCard from './GroupCard';
import { getUserGroups } from '@/utils/API/common';
import FullLoader from '../FullLoader';

export default function SelectTargets({ target, setTarget, disabled = false }) {
  let setInclude = (newValue) => {
    setTarget((prev) => {
      let next = { ...prev, include: newValue };
      return next;
    });
  };

  let setExclude = (newValue) => {
    setTarget((prev) => {
      let next = { ...prev, exclude: newValue };
      return next;
    });
  };

  let searchIncludeUser = useCallback(
    async function (value) {
      let {
        data: { data: userlist },
      } = await get(`/admin/user/getUsers`, null, {
        q: value,
        exclude: target.exclude.join(';'),
        include: target.include.join(';'),
      });
      return userlist;
    },
    [target]
  );

  let searchExcludeUser = useCallback(
    async function (value) {
      let {
        data: { data: userlist },
      } = await get(`/admin/user/getUsers`, null, {
        q: value,
        exclude: target.include.join(';'),
        include: target.exclude.join(';'),
      });
      return userlist;
    },
    [target]
  );

  let { isLoading, data: userGroups } = useQuery({
    queryKey: ['userGroups'],
    queryFn: getUserGroups,
    staleTime: 1000 * 60 * 60 * 24,
  });

  function addGroup() {
    if (
      target.groups.length > 0 &&
      target.groups.some((e) => Object.values(e).some((e) => !e))
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
        {disabled && target.groups.length === 0 ? null : (
          <>
            <Typography variant="subtitle1">Include Groups</Typography>
            <Box
              elevation={2}
              className="py-2 mt-1 grid gap-2 grid-cols-1 md:auto-rows-fr sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
            >
              {target.groups.map((_, i) => (
                <GroupCard
                  target={target}
                  setTarget={setTarget}
                  userGroups={userGroups}
                  key={i}
                  index={i}
                  disabled={disabled}
                />
              ))}
              {!disabled && (
                <Button
                  variant="outlined"
                  className="border-dashed"
                  onClick={addGroup}
                >
                  <AddIcon fontSize="large" />
                </Button>
              )}
            </Box>
          </>
        )}
        <SearchInput
          target={target}
          value={target.include}
          setValue={setInclude}
          queryFn={searchIncludeUser}
          label="Include Users"
          disabled={disabled}
        />
        <SearchInput
          target={target}
          value={target.exclude}
          setValue={setExclude}
          queryFn={searchExcludeUser}
          label="Exclude Users"
          disabled={disabled}
        />
      </Paper>
    </Container>
  );
}
