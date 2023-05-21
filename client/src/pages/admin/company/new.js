import React from 'react';
import { useState } from 'react';
import { TextField, Container, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import FileUpload from '@/components/FileUpload';
import SelectTargets from '@/components/SelectTargets';

const NewCompany = () => {
  const [techStack, setTechStack] = useState(''),
    [companyName, setCompanyName] = useState(''),
    [files, setFiles] = useState([]),
    [target, setTarget] = useState({
      groups: [],
      include: [],
      exclude: [],
    });

  return (
    <>
      <Container
        component="form"
        className="flex flex-col items-center gap-4"
        maxWidth="xl"
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
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
          </Container>
        </div>
        <SelectTargets target={target} setTarget={setTarget} />
        <Container className="flex justify-end p-0 m-0">
          <LoadingButton
            type="submit"
            variant="contained"
            // disabled={isSaveButtonDisabled()}
            // loading={saveChangesMutation.isLoading}
            // onClick={() => setOpenSaveChanges(true)}
          >
            Add Company
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default NewCompany;
