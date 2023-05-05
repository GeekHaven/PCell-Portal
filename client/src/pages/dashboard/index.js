import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Container,
  Typography,
  Tooltip,
  TextField,
  Box,
  ToggleButton,
  Button,
  Divider,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import CreateIcon from '@mui/icons-material/Create';
import { useQuery } from 'react-query';

import FullLoader from '@/components/FullLoader';
import useLoggedinUser from '@/customHooks/useLoggedinUser';
import { getProfile } from '@/utils/API/dashboard/profile';

const Dashboard = () => {
  useLoggedinUser();
  const [mobileActive, setMobileActive] = useState(false);
  const [resumeLinkActive, setResumeLinkActive] = useState(false);
  const [mobile, setMobile] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: 'profile',
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
          <Typography variant="h4" className="hidden md:block">
            My Profile
          </Typography>
          <Typography variant="h5" className="md:hidden block">
            My Profile
          </Typography>
          {!isError && (
            <Tooltip title="Update Course Details">
              <IconButton>
                <CachedIcon className="text-2xl" />
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
                className="md:basis-[30%] sm:basis-[40%] basis-full"
              />
              <Box
                className="flex flex-row flex-nowrap gap-2 rounded-lg border-solid  p-3.5 border-2 md:basis-[30%] sm:basis-[40%] basis-full"
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
                className="flex flex-row flex-nowrap gap-2 rounded-md border-solid  py-3.5 px-2 border-2 md:basis-[30%] sm:basis-[40%] basis-full "
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
                  {profile.completedCredits}
                </Typography>
              </Box>
              <TextField
                disabled
                label="Current Semester"
                defaultValue={profile.currentSem}
                className="md:basis-[30%] sm:basis-[40%] basis-full"
              />
              <TextField
                disabled
                label="Admission Year"
                defaultValue={profile.admissionYear}
                className="md:basis-[30%] sm:basis-[40%] basis-full"
              />
              <TextField
                disabled
                label="Program"
                defaultValue={profile.program}
                className="md:basis-[30%] sm:basis-[40%] basis-full"
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
                <CreateIcon />
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
                <CreateIcon />
              </ToggleButton>
            </Container>
            <Container className="flex justify-end">
              <Button
                variant="contained"
                className="font-bold"
                disabled={isSaveButtonDisabled()}
              >
                Save Changes
              </Button>
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
