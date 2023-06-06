import React from 'react';
import { useState } from 'react';
import {
  TextField,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import FileUpload from '@/components/FileUpload';
import SelectTargets from '@/components/SelectTargets';
import { addCompany } from '@/utils/API/admin/company';

const NewCompany = () => {
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar();
  const [techStack, setTechStack] = useState(''),
    [companyName, setCompanyName] = useState(''),
    [hidden, setHidden] = useState(false),
    [files, setFiles] = useState([]),
    [target, setTarget] = useState({
      groups: [],
      include: [],
      exclude: [],
    });

  let addCompanyMutation = useMutation(addCompany, {
    onSuccess: (data) => {
      enqueueSnackbar('Company added successfully', { variant: 'success' });
      router.push('/admin/company');
    },
    onError: (err) => {
      enqueueSnackbar(err, { variant: 'error' });
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    addCompanyMutation.mutate({
      companyName,
      techStack,
      files,
      target,
      hidden,
    });
  }

  return (
    <>
      <Typography variant="h4" className="text-center -mt-2" color="primary">
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
              defaultValue={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Tech Stack"
              placeholder="Enter the stacks used by the company"
              defaultValue={techStack}
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
            loading={addCompanyMutation.isLoading}
          >
            Add Company
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default NewCompany;
