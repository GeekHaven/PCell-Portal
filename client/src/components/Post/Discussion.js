import React from 'react';
import { Paper } from '@mui/material';
import Comment from './Comment';
import Reply from './Reply';
import NewComment from './NewComment';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getComments } from '@/utils/API/admin/post';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { Container, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import ThemeContext from '@/contexts/theme.context';

export default function Discussion({ params, showDiscussion }) {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [mode, setMode] = useState(theme.palette.mode);

  useEffect(() => {
    setMode(theme.palette.mode);
  }, [theme]);

  const { data: allComments, commentsLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: () => {
      return getComments(router.query.id);
    },
    onSuccess: (data) => {
      setComments(data);
    },
    enabled: showDiscussion,
  });

  if (commentsLoading) {
    return (
      <Container className="h-10 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Paper className="p-4 rounded-md">
      <div className="flex flex-col gap-4">
        <NewComment setComments={setComments} comments={comments} />

        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            setComments={setComments}
            comments={comments}
            setReplies={setReplies}
            replies={replies}
          />
        ))}
      </div>
    </Paper>
  );
}
