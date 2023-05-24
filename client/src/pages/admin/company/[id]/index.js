import React from 'react';
import { useState } from 'react';
import { TextField, Container, Box, ToggleButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import FileUpload from '@/components/FileUpload';
import SelectTargets from '@/components/SelectTargets';
import { addCompany } from '@/utils/API/admin/company';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';
const EditCompany = () => {
  let queryClient = useQueryClient();
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar();
  const [techStack, setTechStack] = useState(''),
    [companyName, setCompanyName] = useState(''),
    [fieldsInactive, setFieldsInactive] = useState({
      companyName: true,
      techStack: true,
      imgName: true,
      targets: {
        groups: true,
        include: true,
        exclude: true,
      },
    }),
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
    });
  }

  return (
    <>
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
            <FileUpload
              files={files}
              setFiles={setFiles}
              disabled={fieldsInactive.imgName}
            />
          </Box>
          <Container
            maxWidth="xl"
            className="w-fit flex-grow flex flex-nowrap justify-around items-center gap-4 flex-col m-0 p-0"
          >
            <Container className="flex flex-nowrap justify-around items-center gap-2 px-0">
              <TextField
                label="Company Name"
                required
                placeholder="Enter the name of Company"
                defaultValue={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onFocus={(e) => setCompanyName(e.target.value)}
                disabled={fieldsInactive.companyName}
                fullWidth
              />
              <ToggleButton
                value="check"
                selected={fieldsInactive.companyName}
                onChange={() => {}}
                className="p-3.5"
              >
                {fieldsInactive.companyName ? <CreateIcon /> : <DoneIcon />}
              </ToggleButton>
            </Container>
            <Container className="flex flex-nowrap justify-around items-center gap-2 px-0">
              <TextField
                label="Tech Stack"
                placeholder="Enter the stacks used by the company"
                defaultValue={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                onFocus={(e) => setTechStack(e.target.value)}
                disabled={fieldsInactive.techStack}
                fullWidth
              />
              <ToggleButton
                value="check"
                selected={fieldsInactive.techStack}
                onChange={() => {}}
                className="p-3.5"
              >
                {fieldsInactive.techStack ? <CreateIcon /> : <DoneIcon />}
              </ToggleButton>
            </Container>
          </Container>
        </div>
        <SelectTargets
          target={target}
          setTarget={setTarget}
          targetsInactive={fieldsInactive.targets}
          edit={true}
        />
        <Container maxWidth="xl" className="flex justify-end p-0 m-0">
          <LoadingButton type="submit" variant="contained">
            Add Company
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default EditCompany;
