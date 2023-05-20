import React from 'react';
import FileUpload from '@/components/FileUpload';
import { useState } from 'react';

import { TextField, ToggleButton, Container, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete from '@mui/material/Autocomplete';
import SelectTargets from '@/components/SelectTargets';

const NewCompany = () => {
  const [techStack, setTechStack] = useState(''),
    [companyName, setCompanyName] = useState('');
  const [files, setFiles] = useState([]);

  return (
    <>
      <Container className="flex flex-col items-center gap-4" maxWidth="xl">
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
        <SelectTargets />
      </Container>
    </>
  );
};

export default NewCompany;
