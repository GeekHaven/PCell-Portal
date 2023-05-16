import React from 'react';
import FileUpload from '@/components/FileUpload';
import { useState } from 'react';

import { TextField, ToggleButton, Container, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';

import SelectTargets from '@/components/SelectTargets';

const NewCompany = () => {
  const [techStackActive, setTechStackActive] = useState(false),
    [companyNameActive, setCompanyNameActive] = useState(false),
    [techStack, setTechStack] = useState(''),
    [companyName, setCompanyName] = useState('');
  const [files, setFiles] = useState([]);

  return (
    <>
      <div className="flex flex-row flex-wrap sm:gap-0 gap-8">
        <Box
          className="h-40 sm:w-40 w-full sm:m-0 mx-4"
          sx={{
            padding: 0,
          }}
        >
          <FileUpload files={files} setFiles={setFiles} />
        </Box>
        <Container className="w-fit flex-grow flex flex-nowrap justify-around items-center gap-4 flex-col">
          <Box className="w-full flex flex-nowrap jutify-around items-center gap-2">
            <TextField
              disabled={!companyNameActive}
              label="Company Name"
              placeholder="Enter the name of Company"
              defaultValue={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={(e) => setCompanyName(e.target.value)}
              fullWidth
              focused={companyNameActive}
            />

            <ToggleButton
              value="check"
              selected={companyNameActive}
              onChange={() => {
                setCompanyNameActive((companyName) => {
                  if (companyName) {
                    return false;
                  }
                  setTechStackActive(false);
                  return true;
                });
              }}
              className="p-3.5"
            >
              {companyNameActive ? <DoneIcon /> : <CreateIcon />}
            </ToggleButton>
          </Box>
          <Box className="w-full flex flex-nowrap jutify-around items-center gap-2">
            <TextField
              disabled={!techStackActive}
              label="Tech Stack"
              placeholder="Enter the stacks used by the company"
              defaultValue={techStack}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={(e) => setCompanyName(e.target.value)}
              fullWidth
              focused={techStackActive}
            />

            <ToggleButton
              value="check"
              selected={techStackActive}
              onChange={() => {
                setTechStackActive((techStack) => {
                  if (techStack) {
                    return false;
                  }
                  setCompanyNameActive(false);
                  return true;
                });
              }}
              className="p-3.5"
            >
              {techStackActive ? <DoneIcon /> : <CreateIcon />}
            </ToggleButton>
          </Box>
        </Container>
        <SelectTargets />
      </div>
    </>
  );
};

export default NewCompany;
