import Post from '@/components/Post';
import {
  CircularProgress,
  Container,
  Box,
  IconButton,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getAllPosts } from '@/utils/API/post';
import { useQuery } from 'react-query';

export const Notification = () => {
  let { data: allPosts, isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  // console.log(allPosts);
  return (
    <>
      <Typography variant="h4" className="text-center -mt-2" color="primary">
        All Posts
      </Typography>
      <Divider className="mb-4 mt-2" />
      <Container maxWidth="xl" className="p-0 m-0">
        <Box className="mb-4 flex md:flex-row flex-col gap-4 md:gap-2 md:items-center">
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
        </Box>
        {!isLoading && (
          <Box className="flex flex-col gap-2">
            {allPosts &&
              allPosts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  baseUrl={'dashboard/post/'}
                  description={post.description}
                  company={post.company}
                  status={post.status}
                />
              ))}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Notification;
