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
import { LoadingButton } from '@mui/lab';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  getCompanyById,
  getCompanyUsers,
  setCompanyVisibility,
  setCompanyStatus,
  setCompanyStatusWithEditCompanyUsers,
  deleteCompany,
} from '@/utils/API/admin/company';

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
  let queryClient = useQueryClient();
  let router = useRouter();

  let [studentListOpenWith, setStudentListOpenWith] = useState(false),
    [chooseShortlistStudentModalOpen, setChooseShortlistStudentModalOpen] =
      useState(false),
    [chooseSelectedStudentModalOpen, setChooseSelectedStudentModalOpen] =
      useState(false),
    [selectShortlistedStudentQuery, setSelectShortlistedStudentQuery] =
      useState(''),
    [selectSelectedStudentQuery, setSelectSelectedStudentQuery] = useState(''),
    [shortlistedStudentsList, setShortlistedStudentsList] = useState([]),
    [selectedStudentsList, setSelectedStudentsList] = useState([]),
    [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const { data: companyData, isLoading } = useQuery(
    ['company', params.id],
    () => getCompanyById(params.id),
    {
      enabled: !!params.id,
    }
  );

  const { data: studentList, isLoading: studentListLoading } = useQuery(
    ['company', params.id, 'studentList'],
    () => getCompanyUsers(params.id, 'studentList'),
    {
      enabled: !!params.id,
      onSuccess: (data) => {
        setShortlistedStudentsList(
          data.filter((student) => student.status !== 'selected')
        );
        setSelectedStudentsList(
          data.filter((student) => student.status !== 'registered')
        );
      },
    }
  );

  const changeVisibilityMutation = useMutation(setCompanyVisibility, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['company', params.id]);
    },
  });

  let changeStatusWithEditCompanyUsersMutation = useMutation(
    setCompanyStatusWithEditCompanyUsers,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['company', params.id, 'studentList']);
        queryClient.invalidateQueries(['company', params.id]);
        setChooseShortlistStudentModalOpen(false);
        setChooseSelectedStudentModalOpen(false);
      },
    }
  );

  let changeStatusMutation = useMutation(setCompanyStatus, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['company', params.id]);
    },
  });

  let deleteCompanyMutation = useMutation(deleteCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['company', params.id]);
      router.push('/admin/company');
    },
  });

  const onHiddenChange = (e) => {
    changeVisibilityMutation.mutate({
      id: params.id,
      hidden: !companyData.hidden,
    });
  };

  const registrationOpen = () => {
    changeStatusMutation.mutate({
      id: params.id,
      status: 'registration open',
    });
  };

  const registrationClosed = () => {
    changeStatusMutation.mutate({
      id: params.id,
      status: 'registration closed',
    });
  };

  function getShortlistedStudents() {
    return shortlistedStudentsList.filter((student) => {
      return student.userId.name
        .toLowerCase()
        .includes(selectShortlistedStudentQuery.toLowerCase());
    });
  }

  function getSelectedStudents() {
    if (!selectedStudentsList) return [];
    return selectedStudentsList.filter((student) => {
      return student.userId.name
        .toLowerCase()
        .includes(selectSelectedStudentQuery.toLowerCase());
    });
  }

  function handleShortlistCompanyModalConfirm() {
    changeStatusWithEditCompanyUsersMutation.mutate({
      id: params.id,
      status: 'shortlisting',
      relations: shortlistedStudentsList.map((student) => {
        let newStudent = { ...student };
        newStudent.userId = student.userId._id;
        return newStudent;
      }),
    });
  }

  function handleSelectCompanyModalConfirm() {
    changeStatusWithEditCompanyUsersMutation.mutate({
      id: params.id,
      status: 'completed',
      relations: selectedStudentsList.map((student) => {
        let newStudent = { ...student };
        newStudent.userId = student.userId._id;
        return newStudent;
      }),
    });
  }

  function handleDeleteCompanyModalConfirm() {
    deleteCompanyMutation.mutate(params.id);
  }

  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }
  return (
    <>
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
                control={
                  <Switch
                    checked={!companyData.hidden}
                    onChange={onHiddenChange}
                  />
                }
                disabled={changeVisibilityMutation.isLoading}
                label={
                  changeVisibilityMutation.isLoading ? (
                    <CircularProgress />
                  ) : companyData.hidden ? (
                    'Hidden'
                  ) : (
                    'Visible'
                  )
                }
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
                  className="capitalize"
                  label={companyData.currentStatus}
                  variant="outlined"
                  color={
                    statusToPreference[companyData.currentStatus] === 3
                      ? 'success'
                      : statusToPreference[companyData.currentStatus] === 2
                      ? 'secondary'
                      : statusToPreference[companyData.currentStatus] === 1
                      ? 'warning'
                      : 'info'
                  }
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
                        statusToPreference[companyData.currentStatus]
                      ]
                    )
                  }
                >
                  View{' '}
                  {
                    preferenceToDefaultModalEntry[
                      statusToPreference[companyData.currentStatus]
                    ]
                  }{' '}
                  students
                </Button>
              </Box>
            </Box>
            {statusToPreference[companyData.currentStatus] < 3 && (
              <>
                <Divider />
                <Box className="w-full flex flex-row flex-wrap items-center gap-2">
                  <Typography
                    className="text-xl font-semibold m-0"
                    color={'primary'}
                  >
                    Actions:
                  </Typography>
                  <Box className="flex fle-row justify-start flex-wrap gap-2">
                    {(statusToPreference[companyData.currentStatus] === 0 ||
                      statusToPreference[companyData.currentStatus] === 1) && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => setChooseShortlistStudentModalOpen(true)}
                      >
                        Shortlist Students
                      </Button>
                    )}
                    {statusToPreference[companyData.currentStatus] === 2 && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => setChooseSelectedStudentModalOpen(true)}
                      >
                        Choose Selected Students
                      </Button>
                    )}
                    {statusToPreference[companyData.currentStatus] === 0 && (
                      <LoadingButton
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={registrationClosed}
                        loading={changeStatusMutation.isLoading}
                      >
                        Close Registrations
                      </LoadingButton>
                    )}
                    {statusToPreference[companyData.currentStatus] === 1 && (
                      <LoadingButton
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={registrationOpen}
                        loading={changeStatusMutation.isLoading}
                      >
                        Open Registrations
                      </LoadingButton>
                    )}
                  </Box>
                </Box>
              </>
            )}
            <Divider />
            <Box className="w-full flex flex-row flex-wrap items-center gap-2">
              <Typography
                className="text-xl font-semibold m-0"
                color={'primary'}
              >
                Manage Company:
              </Typography>
              <Box className="flex fle-row justify-start flex-wrap gap-2">
                <Link href={`./${params.id}/edit`}>
                  <Button variant="outlined" color="secondary" size="small">
                    Edit Company Details
                  </Button>
                </Link>
                <Button
                  color="error"
                  onClick={() => setConfirmDeleteModalOpen(true)}
                >
                  Delete Company
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      </Box>

      {studentList && (
        <>
          {/* Student List Modal */}
          <Modal
            open={studentListOpenWith !== false}
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
                    studentListOpenWith === 'registered'
                      ? 'contained'
                      : 'outlined'
                  }
                  onClick={() => setStudentListOpenWith('registered')}
                >
                  Registered
                </Button>
                <Button
                  variant={
                    studentListOpenWith === 'shortlisted'
                      ? 'contained'
                      : 'outlined'
                  }
                  disabled={statusToPreference[companyData.currentStatus] < 2}
                  onClick={() => setStudentListOpenWith('shortlisted')}
                >
                  Shortlisted
                </Button>
                <Button
                  variant={
                    studentListOpenWith === 'selected'
                      ? 'contained'
                      : 'outlined'
                  }
                  disabled={statusToPreference[companyData.currentStatus] < 3}
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
                  {`${
                    studentList.filter((s) => s.status === studentListOpenWith)
                      .length
                  } students ${studentListOpenWith}`}
                </Typography>
              )}
              <TableContainer className="max-h-96 overflow-auto">
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell className="min-w-[120px]">
                        Roll Number
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentListOpenWith &&
                      studentList
                        .filter((s) => s.status === studentListOpenWith)
                        .map((relation, index) => (
                          <TableRow key={index} hover>
                            <TableCell
                              style={{
                                width: 10,
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell>{relation.userId.name}</TableCell>
                            <TableCell>{relation.userId.rollNumber}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box className="flex flex-row justify-between">
                {studentListOpenWith !== 'registered' &&
                  studentListOpenWith ===
                    preferenceToDefaultModalEntry[
                      statusToPreference[companyData.currentStatus]
                    ] && (
                    <Button
                      className="w-fit self-end"
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        if (studentListOpenWith === 'shortlisted') {
                          setChooseShortlistStudentModalOpen(true);
                        } else if (studentListOpenWith === 'selected') {
                          setChooseSelectedStudentModalOpen(true);
                        }
                      }}
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

          {/* Shortlist Students Modal */}
          <Modal open={chooseShortlistStudentModalOpen}>
            <Paper
              className="absolute top-1/2 left-1/2 p-4 w-full max-w-lg max-h-screen overflow-auto flex flex-col gap-4"
              sx={{
                backgroundColor: 'background.paper',
                transform: 'translate(-50%,-50%)',
              }}
            >
              <Box className="flex flex-row justify-between items-center">
                <Typography variant="h6" color={'primary'}>
                  Shortlist Students
                </Typography>
                <IconButton
                  disabled={changeStatusWithEditCompanyUsersMutation.isLoading}
                  onClick={() => setChooseShortlistStudentModalOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography
                className="text-md font-base m-0"
                color="text.secondary"
              >
                {`${
                  studentList.filter((e) => e.status === 'shortlisted').length
                } students shortlisted`}
              </Typography>
              <Box>
                <TextField
                  label="Search by name"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  value={selectShortlistedStudentQuery}
                  onChange={(e) =>
                    setSelectShortlistedStudentQuery(e.target.value)
                  }
                />
              </Box>
              <TableContainer className="max-h-96 overflow-auto">
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell className="min-w-[120px]">
                        Roll Number
                      </TableCell>
                      <TableCell>{''}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getShortlistedStudents().map((student, index) => (
                      <TableRow key={index} hover>
                        <TableCell
                          style={{
                            width: 10,
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>{student.userId.name}</TableCell>
                        <TableCell>{student.userId.rollNumber}</TableCell>
                        <TableCell>
                          <Checkbox
                            size="small"
                            checked={student.status === 'shortlisted'}
                            onChange={() => {
                              setShortlistedStudentsList((prev) => {
                                let next = [...prev];
                                next[index].status =
                                  student.status === 'shortlisted'
                                    ? 'registered'
                                    : 'shortlisted';
                                return next;
                              });
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box className="flex flex-row justify-between">
                <LoadingButton
                  className="w-fit ml-auto self-end"
                  variant="contained"
                  size="small"
                  loading={changeStatusWithEditCompanyUsersMutation.isLoading}
                  onClick={handleShortlistCompanyModalConfirm}
                >
                  Confirm
                </LoadingButton>
              </Box>
            </Paper>
          </Modal>

          {/* Select Students Modal */}
          <Modal open={chooseSelectedStudentModalOpen}>
            <Paper
              className="absolute top-1/2 left-1/2 p-4 w-full max-w-lg max-h-screen overflow-auto flex flex-col gap-4"
              sx={{
                backgroundColor: 'background.paper',
                transform: 'translate(-50%,-50%)',
              }}
            >
              <Box className="flex flex-row justify-between items-center">
                <Typography variant="h6" color={'primary'}>
                  Choose Selected Students
                </Typography>
                <IconButton
                  disabled={changeStatusWithEditCompanyUsersMutation.isLoading}
                  onClick={() => setChooseSelectedStudentModalOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography
                className="text-md font-base m-0"
                color="text.secondary"
              >
                {`${
                  selectedStudentsList.filter((e) => e.status === 'selected')
                    .length
                } students selected`}
              </Typography>
              <Box>
                <TextField
                  label="Search by name"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  value={selectSelectedStudentQuery}
                  onChange={(e) =>
                    setSelectSelectedStudentQuery(e.target.value)
                  }
                />
              </Box>
              <TableContainer className="max-h-96 overflow-auto">
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell className="min-w-[120px]">
                        Roll Number
                      </TableCell>
                      <TableCell>{''}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getSelectedStudents().map((student, index) => (
                      <TableRow key={index} hover>
                        <TableCell
                          style={{
                            width: 10,
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>{student.userId.name}</TableCell>
                        <TableCell>{student.userId.rollNumber}</TableCell>
                        <TableCell>
                          <Checkbox
                            size="small"
                            checked={student.status === 'selected'}
                            onChange={() => {
                              setSelectedStudentsList((prev) => {
                                let next = [...prev];
                                next[index].status =
                                  student.status === 'selected'
                                    ? 'shortlisted'
                                    : 'selected';
                                return next;
                              });
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box className="flex flex-row justify-between">
                <LoadingButton
                  className="w-fit ml-auto self-end"
                  variant="contained"
                  size="small"
                  loading={changeStatusWithEditCompanyUsersMutation.isLoading}
                  onClick={handleSelectCompanyModalConfirm}
                >
                  Confirm
                </LoadingButton>
              </Box>
            </Paper>
          </Modal>

          {/* Delete Company Modal */}
          <Modal open={confirmDeleteModalOpen}>
            <Paper
              className="absolute top-1/2 left-1/2 p-4 w-full max-w-lg max-h-screen overflow-auto flex flex-col gap-4"
              sx={{
                backgroundColor: 'background.paper',
                transform: 'translate(-50%,-50%)',
              }}
            >
              <Box className="flex flex-row justify-between items-center">
                <Typography variant="h6" color={'primary'}>
                  Delete Company
                </Typography>
                <IconButton
                  disabled={deleteCompanyMutation.isLoading}
                  onClick={() => setConfirmDeleteModalOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography
                className="text-md font-base m-0"
                color="text.secondary"
              >
                Are you sure you want to delete this company?
              </Typography>
              <Box className="flex flex-row justify-end gap-2">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => {
                    setConfirmDeleteModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  className="w-fit self-end"
                  variant="outlined"
                  color="error"
                  size="small"
                  loading={deleteCompanyMutation.isLoading}
                  onClick={handleDeleteCompanyModalConfirm}
                >
                  Confirm
                </LoadingButton>
              </Box>
            </Paper>
          </Modal>
        </>
      )}
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
