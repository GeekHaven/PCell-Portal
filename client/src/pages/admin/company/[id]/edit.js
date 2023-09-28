import React from 'react';
import { useState } from 'react';
import { TextField, Container, Box, Typography, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import FileUpload from '@/components/FileUpload';
import SelectTargets from '@/components/SelectTargets';
import { editCompany, getCompanyById } from '@/utils/API/admin/company';

const EditCompany = () => {
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar();

  const { id } = router.query;
  const queryClient = useQueryClient();

  const [techStack, setTechStack] = useState(''),
    [companyName, setCompanyName] = useState(''),
    [files, setFiles] = useState([]),
    [target, setTarget] = useState({
      groups: [],
      include: [],
      exclude: [],
    });

  const { data: companyData, isLoading } = useQuery(
    ['company', id],
    () => getCompanyById(id),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setCompanyName(data.name);
        setTechStack(data.techStack);
        setFiles([{ src: data.logo, name: 'logo' }]);
        setTarget(data.targets);
      },
    }
  );

  let editCompanyMutation = useMutation(editCompany, {
    onSuccess: (data) => {
      enqueueSnackbar('Company Updated successfully', { variant: 'success' });
      router.back();
    },
    onError: (err) => {
      enqueueSnackbar(err, { variant: 'error' });
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    editCompanyMutation.mutate({
      id,
      companyName,
      techStack,
      files,
      target,
    });
  }

  return (
    <>
      <Typography variant="subtitle1" className="-mt-2" color="primary">
        Edit Companies
      </Typography>
      <Divider className="mb-4 mt-2" />
      <Container
        component="form"
        className="flex flex-col items-center gap-4"
        maxWidth="xl"
        onSubmit={onSubmit}
      >
        <div className="flex flex-row w-full flex-wrap gap-4 justify-between">
          <Box
            className="h-40 sm:w-40 w-full sm:m-0 "
            sx={{
              padding: 0,
            }}
          >
            <FileUpload files={files} setFiles={setFiles} />
          </Box>
          <Container
            maxWidth="xl"
            className="w-fit flex-grow flex flex-nowrap justify-around items-center gap-4 flex-col m-0 p-0"
          >
            <TextField
              label="Company Name"
              required
              placeholder="Enter the name of Company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Tech Stack"
              placeholder="Enter the stacks used by the company"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              onFocus={(e) => setTechStack(e.target.value)}
              fullWidth
            />
          </Container>
        </div>
        <SelectTargets target={target} setTarget={setTarget} />
        <Container maxWidth="xl" className="flex justify-end p-0 m-0">
          <LoadingButton
            type="submit"
            variant="contained"
            loading={editCompanyMutation.isLoading}
          >
            Edit Company
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default EditCompany;
