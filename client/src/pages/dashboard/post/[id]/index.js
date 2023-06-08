import {
  Container,
  Divider,
  Box,
  Paper,
  Typography,
  ToggleButton,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPostById } from '@/utils/API/post';
import { CircularProgress } from '@mui/material';
import Discussion from '@/components/Post/Discussion';
import { isUserAuthenticated } from '@/utils/API/auth';

export default function IndividialPostAdmin({ params }) {
  const [showDiscussion, setShowDiscussion] = useState(false);


  let { data: user } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });


  let { data: post, isLoading } = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => {
      return getPostById(params.id);
    },
  });



  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      
      <Paper className="sm:p-4 p-2 rounded-md">
        <Typography variant="h4" className="text-2xl font-semibold mb-1">
          {post.title}
        </Typography>
        <Typography variant="h5" className="text-lg">
          {post.description}
        </Typography>
        <Divider className="my-3" />
        <Box>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </Box>
      </Paper>
        <Box className="flex">
          <ToggleButton
            className="ml-auto"
            size="small"
            value="check"
            color="primary"
            selected={!showDiscussion}
            onChange={() => {
              setShowDiscussion(!showDiscussion);
            }}
          >
            {showDiscussion ? 'Hide Discussion' : 'Show Discussion'}
          </ToggleButton>
        </Box>
        {showDiscussion && <Discussion showDiscussion={showDiscussion} commentsType={post.comments} isAdmin={user.isAdmin}/>}
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}
