import { Paper } from '@mui/material';
import React from 'react';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import ReplyIcon from '@mui/icons-material/Reply';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import ThemeContext from '@/contexts/theme.context';

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

export default function Comment(props) {
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
  console.log(author);

  const { theme } = useContext(ThemeContext);

  const [mode, setMode] = useState(theme.palette.mode);

  useEffect(() => {
    setMode(theme.palette.mode);
  }, [theme]);

  return (
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
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        {props.comment.content}
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className={`flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 ${
            mode === 'dark' && `bg-[#1e2a3a]`
          } ${mode === 'light' && `bg-[#fefeff]`}`}
        >
          <ReplyIcon className="mr-1" />
          Reply
        </button>
      </div>
    </Paper>
  );
}
