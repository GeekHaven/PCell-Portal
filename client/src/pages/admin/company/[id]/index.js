import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  FormControlLabel,
  Switch,
  Button,
  ButtonGroup,
  Paper,
  Modal,
  IconButton,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Container,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import { useQuery, useMutation } from 'react-query';
import { getCompanyById } from '@/utils/API/admin/company';

let registeredStudentList = [];
let shortlistedStudentList = [];

for (let i = 0; i < 1000; i++) {
  registeredStudentList.push({
    name: 'Studentmb bnnb j hhjbigygyugyugyugybjhb hbugug ' + i,
    rollNumber: i,
  });
}

for (let i = 0; i < 100; i++) {
  shortlistedStudentList.push({
    name: 'Student ' + i,
    rollNumber: i,
  });
}

let studentList = {
  registered: registeredStudentList,
  shortlisted: shortlistedStudentList,
  selected: [],
};

let statusToPreference = {
  'registration open': 0,
  'registration closed': 1,
  shortlisting: 2,
  completed: 3,
};

let preferenceToDefaultModalEntry = [
  'registered',
  'registered',
  'shortlisted',
  'selected',
];

export default function IndividualCompanyAdmin({ params }) {
  let [studentListOpenWith, setStudentListOpenWith] = useState(false),
    [chooseStudentModalOpen, setChooseStudentModalOpen] = useState(false);
  const {
    data: companyData,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useQuery(['company', params.id], () => getCompanyById(params.id), {
    enabled: !!params.id,
  });
  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }
  return (
    <>
      <Modal
        open={studentListOpenWith}
        onClose={() => setStudentListOpenWith(false)}
      >
        <Paper
          className="absolute top-1/2 left-1/2 p-4 w-full max-w-lg max-h-screen overflow-auto flex flex-col gap-4"
          sx={{
            backgroundColor: 'background.paper',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Box className="flex flex-row justify-between items-center">
            <Typography variant="h6" color={'primary'}>
              Student Lists
            </Typography>
            <IconButton onClick={() => setStudentListOpenWith(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ButtonGroup size="small">
            <Button
              variant={
                studentListOpenWith === 'registered' ? 'contained' : 'outlined'
              }
              onClick={() => setStudentListOpenWith('registered')}
            >
              Registered
            </Button>
            <Button
              variant={
                studentListOpenWith === 'shortlisted' ? 'contained' : 'outlined'
              }
              disabled={statusToPreference[companyData.status] < 2}
              onClick={() => setStudentListOpenWith('shortlisted')}
            >
              Shortlisted
            </Button>
            <Button
              variant={
                studentListOpenWith === 'selected' ? 'contained' : 'outlined'
              }
              disabled={statusToPreference[companyData.status] < 3}
              onClick={() => setStudentListOpenWith('selected')}
            >
              Selected
            </Button>
          </ButtonGroup>
          {studentListOpenWith && (
            <Typography
              className="text-md font-base m-0"
              color="text.secondary"
            >
              {`${studentList[studentListOpenWith].length} students ${studentListOpenWith}`}
            </Typography>
          )}
          <TableContainer className="max-h-96 overflow-auto">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell className="min-w-[120px]">Roll Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentListOpenWith &&
                  studentList[studentListOpenWith].map((student, index) => (
                    <TableRow key={index} hover>
                      <TableCell
                        style={{
                          width: 10,
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="flex flex-row justify-between">
            {studentListOpenWith !== 'registered' && (
              <Button
                className="w-fit self-end"
                size="small"
                variant="outlined"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            )}
            <Button
              className="w-fit ml-auto self-end"
              variant="contained"
              size="small"
              endIcon={<ArrowRightAltIcon />}
            >
              Export Users
            </Button>
          </Box>
        </Paper>
      </Modal>
      <Box
        className="flex flex-row items-start justify-start gap-4"
        sx={{
          padding: 0,
          width: '100%',
        }}
      >
        <div className="flex flex-row w-full sm:flex-nowrap flex-wrap gap-4 justify-center sm:justify-start">
          <div className="flex sm:flex-col flex-row gap-4 w-full sm:w-fit justify-between">
            <Box
              className="h-40 sm:m-0"
              sx={{
                padding: 0,
              }}
            >
              <img
                src={companyData.logo}
                className="object-contain h-full aspect-square rounded-md"
                alt="Google"
              />
            </Box>
            <Box className="flex justify-evenly flex-col sm:items-center">
              <Typography
                className="text-2xl font-semibold md:text-center mb-2"
                color={'primary'}
              >
                {companyData.name}
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Hidden"
              />
            </Box>
          </div>
          <Divider
            orientation="vertical"
            flexItem
            className="hidden sm:block"
          />
          <Box className="flex flex-col gap-4 flex-grow">
            <Box className="w-full flex flex-row flex-wrap items-center gap-2">
              <Typography
                component="div"
                className="text-xl font-semibold m-0"
                color={'primary'}
              >
                Current Status :
              </Typography>
              <Box className="flex fle-row justify-start flex-wrap gap-2">
                <Chip
                  label={'Registration Closed'}
                  variant="outlined"
                  color="warning"
                  icon={
                    <FiberManualRecordTwoToneIcon
                      sx={{
                        fontSize: '1rem',
                      }}
                    />
                  }
                />
                <Button
                  size="small"
                  onClick={() =>
                    setStudentListOpenWith(
                      preferenceToDefaultModalEntry[
                        statusToPreference[companyData.status]
                      ]
                    )
                  }
                >
                  View{' '}
                  {
                    preferenceToDefaultModalEntry[
                      statusToPreference[companyData.status]
                    ]
                  }{' '}
                  students
                </Button>
              </Box>
            </Box>
            {statusToPreference[companyData.status] < 3 && (
              <>
                <Divider />
                <Box className="w-full flex flex-row flex-wrap items-center gap-2">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() =>
                      setChooseStudentModalOpen(
                        preferenceToDefaultModalEntry[
                          statusToPreference[companyData.status] + 1
                        ]
                      )
                    }
                  >
                    Choose{' '}
                    {
                      preferenceToDefaultModalEntry[
                        statusToPreference[companyData.status] + 1
                      ]
                    }{' '}
                    Students
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </div>
      </Box>
      <Modal
        open={chooseStudentModalOpen}
        onClose={() => setChooseStudentModalOpen(false)}
      >
        <Paper
          className="absolute top-1/2 left-1/2 p-4 w-full max-w-lg max-h-screen overflow-auto flex flex-col gap-4"
          sx={{
            backgroundColor: 'background.paper',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Box className="flex flex-row justify-between items-center">
            <Typography variant="h6" color={'primary'}>
              Student Lists
            </Typography>
            <IconButton onClick={() => setChooseStudentModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography className="text-md font-base m-0" color="text.secondary">
            {`100 students shortlisted`}
          </Typography>
          <Box className="mb-1 flex md:flex-row flex-col gap-4 md:gap-2 md:items-center">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              className="flex-grow mr-1"
            />
          </Box>
          <TableContainer className="max-h-96 overflow-auto">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell className="min-w-[120px]">Roll Number</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registeredStudentList.map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell
                      style={{
                        width: 10,
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="flex flex-row justify-between">
            <Button
              className="w-fit ml-auto self-end"
              variant="contained"
              size="small"
            >
              Confirm
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}
