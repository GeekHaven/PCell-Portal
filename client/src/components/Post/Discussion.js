import React from 'react';
import { Divider, Paper } from '@mui/material';
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
import { isUserAuthenticated } from '@/utils/API/auth';
import { getCommentsUser } from '@/utils/API/post';

export default function Discussion({
  params,
  showDiscussion,
  commentsType,
  isAdmin,
}) {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [commentsEnable, setCommentsEnable] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [mode, setMode] = useState(theme.palette.mode);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setMode(theme.palette.mode);
  }, [theme]);

  const { data: allComments, commentsLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: () => {
      if (isAdmin) return getComments(router.query.id);
      return getCommentsUser(router.query.id);
    },
    onSuccess: (data) => {
      setComments(data);
    },
    enabled: showDiscussion,
  });

  useEffect(() => {
    if (commentsType === 'disabled') {
      setIsEnabled(false);
    }
  }, [commentsType]);

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
        {(isEnabled || isAdmin) && (
          <>
            <NewComment setComments={setComments} isAdmin={isAdmin} />
            <Divider className="mb-4" />
          </>
        )}

        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isEnabled={isEnabled}
            isAdmin={isAdmin}
            setComments={setComments}
          />
        ))}
      </div>
    </Paper>
  );
}
