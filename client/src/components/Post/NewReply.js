import React, { useContext } from 'react';
import { Paper, Container } from '@mui/material';
import ThemeContext from '@/contexts/theme.context';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { addComment } from '@/utils/API/admin/post';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { addCommentUser } from '@/utils/API/post';

export default function NewReply({ setReplies, replyTo, isAdmin }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [content, setContent] = useState('');
  const { theme } = useContext(ThemeContext);
  const [mode, setMode] = useState(theme.palette.mode);

  useEffect(() => {
    setMode(theme.palette.mode);
  }, [theme]);

  let postReply;

  if (isAdmin) {
    postReply = useMutation(addComment, {
      onSuccess: (data) => {
        enqueueSnackbar('Reply added successfully', { variant: 'success' });
        setReplies((prev) => [...prev, data]);
        setContent('');
      },
      onError: (err) => {
        enqueueSnackbar(err, { variant: 'error' });
      },
    });
  } else {
    postReply = useMutation(addCommentUser, {
      onSuccess: (data) => {
        enqueueSnackbar('Reply added successfully', { variant: 'success' });
        setReplies((prev) => [...prev, data]);
        setContent('');
      },
      onError: (err) => {
        enqueueSnackbar(err, { variant: 'error' });
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    postReply.mutate({
      postId: router.query.id,
      replyTo: replyTo,
      content,
    });
  }

  return (
    <Container
      maxWidth="xl"
      className="p-0 pl-12"
      component="form"
      onSubmit={handleSubmit}
    >
      <Paper className="py-2 px-4 mb-4 rounded-lg rounded-t-lg" elevation={3}>
        <label htmlFor="comment" className="sr-only">
          Your reply
        </label>

        <textarea
          id="comment"
          // rows="6"
          className={`px-0 w-full text-sm text-gray-900 border-0  focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 ${
            mode === 'dark' && `bg-[#1e2a3a]`
          } ${mode === 'light' && `bg-[#fefeff]`}`}
          placeholder="Write a reply..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </Paper>
      <LoadingButton
        type="submit"
        variant="contained"
        loading={postReply.isLoading}
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Add Reply
      </LoadingButton>
    </Container>
  );
}
