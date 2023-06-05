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
import { getPostById } from '@/utils/API/admin/post';
import { CircularProgress } from '@mui/material';
import Discussion from '@/components/Post/Discussion';

export default function IndividialPostAdmin({ params }) {
  const [showDiscussion, setShowDiscussion] = useState(false);

  let { data: post, isLoading } = useQuery({
    queryKey: ['post'],
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
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
      {showDiscussion && <Discussion showDiscussion={showDiscussion} />}
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
