import { Paper } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import ReplyIcon from '@mui/icons-material/Reply';
import ThemeContext from '@/contexts/theme.context';
import NewComment from './NewComment';
import NewReply from './NewReply';
import Reply from './Reply';
import { getReplies } from '@/utils/API/admin/post';
import { stringAvatar } from '@/utils/styledAvatar.js'
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { CircularProgress, Container } from '@mui/material';
import CommentActions from './CommentActions';
import { getRepliesUser } from '@/utils/API/post';

export default function Comment(props) {
  const router = useRouter();
  const createdAt = moment(props.comment.createdAt).fromNow();
  const fullName = props.comment.author.name;
  const nameParts = fullName
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    .split(' ');
  if (nameParts.length > 2) {
    nameParts.splice(1, 1);
  }
  const author = nameParts.join(' ');

  const { theme } = useContext(ThemeContext);
  const [mode, setMode] = useState(theme.palette.mode);
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyTo, setReplyTo] = useState(props.comment._id);

  useEffect(() => {
    setMode(theme.palette.mode);
  }, [theme]);

  const { data: allReplies, repliesLoading } = useQuery({
    queryKey: ['replies', router.query.id, props.comment._id],
    queryFn: () => {
      const reply = {
        postId : router.query.id,
        replyTo : props.comment._id
      }
      console.log(getRepliesUser(reply));
      if(props.isAdmin) return getReplies(reply);
      else return getRepliesUser(reply);
    },
    onSuccess: (data) => {
      setReplies(data);
    },
    enabled: showReply,
  });

  if (repliesLoading) {
    return (
      <Container className="h-10 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Paper className="p-4 text-base" elevation={3}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-md capitalize">
              <Avatar {...stringAvatar(author)} className="mr-2" />
              {author}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                {createdAt}
              </time>
            </p>
          </div>
          <CommentActions/>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400">
          {props.comment.content}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          {props.isEnabled && <button
            type="button"
            className={`flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 ${mode === 'dark' && `bg-[#1e2a3a]`
              } ${mode === 'light' && `bg-[#fefeff]`}`}
            onClick={() => setShowReply(!showReply)}
          >
            <ReplyIcon className="mr-1" />
            Reply
          </button>}
        </div>
      </Paper>

      {showReply && (
        <>
          <NewReply setReplies={setReplies} replyTo={replyTo} isAdmin={props.isAdmin}/>
          {replies.map((reply) => (
            <Reply 
              key={reply._id}
              reply={reply}
              />
          ))}
        </>
      )}
    </>
  );
}