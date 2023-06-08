import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { editComment, deleteComment } from '@/utils/API/admin/post';
import { useMutation } from 'react-query';

const options = ['Edit', 'Delete'];

const ITEM_HEIGHT = 48;

export default function LongMenu({ postId, commentId, setComments }) {
  const { mutateAsync: editCommentMutate } = useMutation(editComment, {
    onSuccess: (data) => {
      setComments((prev) => {
        return prev.map((comment) => {
          if (comment._id === commentId) {
            comment.content = data.content;
          }
          return comment;
        });
      });
    },
  });
  const { mutateAsync: deleteCommentMutate } = useMutation(deleteComment, {
    onSuccess: (data) => {
      setComments((prev) => {
        return prev.filter((comment) => comment._id !== commentId);
      });
    },
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl((prev) => event.currentTarget);
    // console.log(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleValue = async (event) => {
    const value = event.target.getAttribute('value');
    console.log(postId);

    if (value === 'edit') {
      const content = prompt('Enter new content');
      if (content) {
        await editCommentMutate({ postId, commentId, content });
      }
    }
    if (value === 'delete') {
      await deleteCommentMutate({ postId, commentId });
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={handleValue}
            value={option.toLowerCase()}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
