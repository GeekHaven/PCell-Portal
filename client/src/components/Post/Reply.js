import React from 'react';
import { Paper } from '@mui/material';
import { stringAvatar } from '@/utils/styledAvatar.js';
import { Avatar } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import CommentActions from './CommentActions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Reply(props) {
  const router = useRouter();
  const createdAt = moment(props.reply.createdAt).fromNow();
  const fullName = props.reply.author.name;
  const nameParts = fullName
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    .split(' ');
  if (nameParts.length > 2) {
    nameParts.splice(1, 1);
  }
  const author = nameParts.join(' ');
  return (
    <Paper className="p-6 mb-2 ml-6 lg:ml-12 text-base" elevation={2}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 text-md capitalize">
            <Avatar {...stringAvatar(author)} className="mr-2" />
            {author}
            {props.reply.madeByAdmin && (
              <AdminPanelSettingsIcon className="ml-2" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time datetime="2022-02-08" title="February 8th, 2022">
              {createdAt}
            </time>
          </p>
        </div>
        <CommentActions
          postId={props.postId}
          commentId={props.reply._id}
          setComments={props.setReplies}
          adminRoute={router.pathname.includes('admin')}
          authorRollNumber={props.reply.author.rollNumber}
          madeByAdmin={props.reply.madeByAdmin}
        />
      </div>
      <p className="text-gray-500 dark:text-gray-400">{props.reply.content}</p>
      {/* <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className={`flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 ${mode === 'dark' && `bg-[#1e2a3a]`
            } ${mode === 'light' && `bg-[#fefeff]`}`}
        >
          <ReplyIcon className="mr-1" />
          Reply
        </button>
      </div> */}
    </Paper>
  );
}
