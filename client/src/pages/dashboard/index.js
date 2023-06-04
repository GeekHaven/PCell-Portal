import Post from '@/components/Post';
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Container,
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { getAllPosts } from '@/utils/API/admin/post';
import { useMutation } from 'react-query';
import Link from 'next/link';
import { useQuery } from 'react-query';

export const Notification = () => {
  const [posts, setPosts] = useState([]);

  let { data: allPosts, isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts,
    onSuccess: (data) => {
      setPosts(data);
    },
  });

  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  console.log(posts);
  return (
    <>
      <Container maxWidth="xl">
        <Paper
          elevation={2}
          className="py-4 px-4 mb-4 flex md:flex-row flex-col gap-4 md:gap-2 md:items-center"
        >
          <div className="flex flex-nowrap flex-grow w-full">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              className="flex-grow mr-1"
            />
            <IconButton
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '8px',
                marginRight: '4px',
              }}
              //   onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <div className="flex md:flex-nowrap items-center justify-start gap-0 flex-grow md:flex-grow-0 w-full md:w-fit flex-wrap">
            <FormControl className="w-28" size="small">
              <InputLabel id="sortByUi">Sort By</InputLabel>
              <Select
                labelId="sortByUi"
                id="sortBy"
                // value={sortBy}
                label="Sort By"
                onChange={(e) => {
                  //   setSortBy(e.target.value);
                }}
              >
                <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'status'}>Status</MenuItem>
              </Select>
            </FormControl>
            <div className="flex flex-nowrap justify-center items-center mx-2">
              <Tooltip title="Sort">
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // setSort(sort === 1 ? -1 : 1);
                  }}
                >
                  <ArrowDropUpIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Paper>
        {!isLoading && (
          <>
            {posts &&
              posts.map((post) => (
                <Box className="px-2 py-2">
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    baseUrl={'dashboard/post/'}
                    description={post.description}
                    company={post.company}
                    status={post.status}
                  />
                </Box>
              ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Notification;
