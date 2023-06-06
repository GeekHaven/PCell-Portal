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
import { getAllPosts } from '@/utils/API/admin/post';
import { useQuery } from 'react-query';

export default function AllPosts() {
  const { data: allPosts, isLoading } = useQuery({
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
  return (
    <>
      <Typography variant="subtitle1" className="-mt-2" color="primary">
        All Posts
      </Typography>
      <Divider className="mb-4 mt-2" />
      <Container maxWidth="xl" className="m-0 p-0">
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
                  baseUrl={'post/'}
                  description={post.description}
                  company={post.company}
                  status={post.status}
                  createdAt={post.createdAt}
                />
              ))}
          </Box>
        )}
      </Container>
    </>
  );
}
