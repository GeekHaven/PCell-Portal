import { Container, Divider, Box, Chip, Paper, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '@/contexts/theme.context';
import Comment from '@/components/Post/Comment';
import Reply from '@/components/Post/Reply';
import NewComment from '@/components/Post/NewComment';
import { useQuery } from 'react-query';
import { addComment, getPostById } from '@/utils/API/admin/post';
import { CircularProgress } from '@mui/material';
import Discussion from '@/components/Post/Discussion';
import { getComments } from '@/utils/API/admin/post';

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
    <div className="">
      <Paper maxWidth="xl" className="sm:px-8 px-4 py-8 my-4 rounded-md">
        <div className="flex justify-start gap-4 text-3xl font-bold">
          {post.title}
        </div>
        <div className="flex justify-start gap-4 text-lg mt-4">
          {post.description}
        </div>

        <Divider className="my-3" />

        <Box maxWidth="xl">
          <div
            className="content mb-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </Box>
      </Paper>

      {!showDiscussion && (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setShowDiscussion(true);
            }}
            className="w-1/3"
          >
            <div className="flex justify-center items-center gap-2">
              <span className="w-full text-lg">Show Discussion</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Button>
        </div>
      )}

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
