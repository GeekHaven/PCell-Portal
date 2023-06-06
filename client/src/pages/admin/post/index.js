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
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getAllPosts } from '@/utils/API/admin/post';
import { useMutation } from 'react-query';

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [search, setSearch] = useState('');
  const searchMutation = useMutation(getAllPosts, {
    onSuccess: (data) => {
      setAllPosts(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    searchMutation.mutate({ search });
  }, []);
  const handleSearch = () => {
    searchMutation.mutate({ search });
  };

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
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <IconButton
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '8px',
                marginRight: '4px',
              }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Box>
        {searchMutation.isLoading && (
          <Container className="h-96 w-full flex justify-center items-center">
            <CircularProgress />
          </Container>
        )}
        {
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
        }
      </Container>
    </>
  );
}
