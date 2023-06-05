import React, { useContext } from 'react'
import { Paper } from '@mui/material';
import ThemeContext from '@/contexts/theme.context';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { addComment } from '@/utils/API/admin/post';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

export default function NewComment({ params, setComments, comments }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [replyTo, setreplyTo] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [mode, setMode] = useState(theme.palette.mode);

  useEffect(() => {
    setMode(theme.palette.mode);
  }, [theme]);

  const postComment = useMutation(addComment, {
    onSuccess: (data) => {
      alert('success');
      setComments(data);
    },
    onError: (err) => {
      enqueueSnackbar(err, { variant: 'error' });
    },
  });

  const handleClick = () => {
     postComment.mutate({
       postId: router.query.id,
       replyTo,
       content,
     });
     
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold">Discussion (20)</h2>
      </div>
      <form className="mb-6">
        <Paper className="py-2 px-4 mb-4 rounded-lg rounded-t-lg" elevation={3}>
          <label for="comment" className="sr-only">
            Your comment
          </label>

          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0  focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-[#1e2a3a]"
            placeholder="Write a comment..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </Paper>
        <button
          type="button"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          onClick={() => {
            handleClick();
          }}
        >
          Post comment
        </button>
      </form>
    </>
  );
}

