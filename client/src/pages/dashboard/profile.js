import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Container,
  Typography,
  Tooltip,
  TextField,
  Box,
  ToggleButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import SEO from '@/components/SEO';

import FullLoader from '@/components/FullLoader';
import PasswordModal from '@/components/PasswordModal';
import {
  getProfile,
  saveChanges,
  updateCourseDetails,
} from '@/utils/API/dashboard/profile';
import useUser from '@/customHooks/useUser';

const Dashboard = () => {
  let queryClient = useQueryClient();
  let { user } = useUser();
  const [mobileActive, setMobileActive] = useState(false),
    [resumeLinkActive, setResumeLinkActive] = useState(false),
    [mobile, setMobile] = useState(''),
    [resumeLink, setResumeLink] = useState(''),
    [openUpdateCourseDetails, setOpenUpdateCourseDetails] = useState(false),
    [openSaveChanges, setOpenSaveChanges] = useState(false);

  const saveChangesMutation = useMutation(saveChanges, {
    onSuccess: () => {
      setMobileActive(false);
      setResumeLinkActive(false);
      queryClient.invalidateQueries({ queryKey: ['profile', user.rollNumber] });
    },
  });

  const handleSaveChanges = (password) => {
    saveChangesMutation.mutate({ mobile, resumeLink, password });
  };

  const updateCourseDetailsMutation = useMutation(updateCourseDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user.rollNumber] });
    },
  });

  const handleCourseDetailsSubmit = (password) => {
    updateCourseDetailsMutation.mutate({ password });
  };

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile', user.rollNumber],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 60,
  });

  function isSaveButtonDisabled() {
    return (
      profile.mobile === mobile &&
      (profile.resumeLink === resumeLink || !resumeLink)
    );
  }
  useEffect(() => {
    if (!isLoading && profile) {
      setMobile(profile.mobile);
      setResumeLink(profile.resumeLink);
    }
  }, [isLoading, profile]);

  if (isLoading) return <FullLoader />;
  return (
    <>
      <SEO title="Dashboard" />
      <PasswordModal
        open={openUpdateCourseDetails}
        setOpen={setOpenUpdateCourseDetails}
        onSubmit={handleCourseDetailsSubmit}
      />
      <PasswordModal
        open={openSaveChanges}
        setOpen={setOpenSaveChanges}
        onSubmit={handleSaveChanges}
      />
      <Container fixed className=" flex flex-col gap-8">
        <Container
          className="flex flex-wrap justify-between items-center"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            paddingY: '16px',
            paddingX: '8px',
          }}
        >
          <Typography variant="h4" className="hidden md:block" color="primary">
            My Profile
          </Typography>
          <Typography variant="h5" className="md:hidden block" color="primary">
            My Profile
          </Typography>
          {!isError && (
            <Tooltip title="Update Course Details">
              <IconButton onClick={() => setOpenUpdateCourseDetails(true)}>
                {updateCourseDetailsMutation.isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <CachedIcon className="text-2xl" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Container>
        {isError ? (
          <Container className="flex flex-wrap jutify-center items-center">
            <Typography
              variant="body1"
              className="w-full font-medium text-center"
              color="error.main"
            >
              {' '}
              Some Error Occured
            </Typography>
          </Container>
        ) : (
          <>
            <Container className="flex flex-wrap jutify-around items-center">
              <TextField
                disabled
                label="Name"
                defaultValue={profile.name}
                fullWidth
              />
            </Container>
            <Container className="flex flex-wrap justify-between items-center gap-4 ">
              <TextField
                disabled
                label="Enrollment Number"
                defaultValue={profile.rollNumber}
                className="md:basis-[30%] sm:basis-[45%] basis-full"
              />
              <Box
                className="flex flex-row flex-nowrap gap-2 rounded-lg border-solid  p-3.5 border-2 md:basis-[30%] sm:basis-[45%] basis-full"
                sx={{
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body1" className="font-medium">
                  CGPA :
                </Typography>
                <Typography
                  variant="body1"
                  className="font-bold"
                  color={
                    profile.cgpa === 6.9
                      ? '#FFD700'
                      : profile.cgpa < 7
                      ? 'error.main'
                      : profile.cgpa < 7.5
                      ? 'warning.main'
                      : 'success.main'
                  }
                >
                  {Number(profile.cgpa)}
                </Typography>
              </Box>
              <Box
                className="flex flex-row flex-nowrap gap-2 rounded-md border-solid  py-3.5 px-2 border-2 md:basis-[30%] sm:basis-[45%] basis-full "
                sx={{
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body1" className="font-medium">
                  Credits:
                </Typography>
                <Typography
                  variant="body1"
                  className="font-bold"
                  color="primary"
                >
                  {`${profile.completedCredits} / ${profile.totalCredits}`}
                </Typography>
              </Box>
              <TextField
                disabled
                label="Current Semester"
                defaultValue={profile.currentSem}
                className="md:basis-[30%] sm:basis-[45%] basis-full"
              />
              <TextField
                disabled
                label="Admission Year"
                defaultValue={profile.admissionYear}
                className="md:basis-[30%] sm:basis-[45%] basis-full"
              />
              <TextField
                disabled
                label="Program"
                defaultValue={profile.program}
                className="md:basis-[30%] sm:basis-[45%] basis-full"
              />
            </Container>
            <Divider />
            <Container className="flex flex-nowrap jutify-around items-center gap-2">
              <TextField
                disabled={!mobileActive}
                label="Mobile Number"
                defaultValue={profile.mobile}
                onChange={(e) => setMobile(e.target.value)}
                onFocus={(e) => setMobile(e.target.value)}
                fullWidth
                focused={mobileActive}
              />

              <ToggleButton
                value="check"
                selected={mobileActive}
                color={mobileActive ? 'success' : undefined}
                onChange={() => {
                  setMobileActive((mobile) => {
                    if (mobile) {
                      return false;
                    }
                    setResumeLinkActive(false);
                    return true;
                  });
                }}
                className="p-3.5"
              >
                {mobileActive ? <DoneIcon /> : <CreateIcon />}
              </ToggleButton>
            </Container>
            <Container className="flex flex-nowrap jutify-around items-center gap-2">
              <TextField
                disabled={!resumeLinkActive}
                label="Resume Link"
                placeholder="Google Docs Link"
                defaultValue={profile.resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                onFocus={(e) => setResumeLink(e.target.value)}
                fullWidth
                focused={resumeLinkActive}
              />

              <ToggleButton
                value="check"
                selected={resumeLinkActive}
                color={resumeLinkActive ? 'success' : undefined}
                onChange={() => {
                  setResumeLinkActive((resumeLink) => {
                    if (resumeLink) {
                      return false;
                    }
                    setMobileActive(false);
                    return true;
                  });
                }}
                className="p-3.5"
              >
                {resumeLinkActive ? <DoneIcon /> : <CreateIcon />}
              </ToggleButton>
            </Container>
            <Container className="flex justify-end">
              <LoadingButton
                variant="contained"
                className="font-bold"
                disabled={isSaveButtonDisabled()}
                loading={saveChangesMutation.isLoading}
                onClick={() => setOpenSaveChanges(true)}
              >
                Save Changes
              </LoadingButton>
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
