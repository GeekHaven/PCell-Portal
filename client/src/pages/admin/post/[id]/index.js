import {
  Container,
  Divider,
  Box,
  Paper,
  ToggleButton,
  Typography,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPostById } from '@/utils/API/admin/post';
import { CircularProgress } from '@mui/material';
import Discussion from '@/components/Post/Discussion';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PopupModal from '@/components/PopupModal';
import { deletePost } from '@/utils/API/admin/post';
import { useRouter } from 'next/router';
import { isUserAuthenticated } from '@/utils/API/auth';

export default function IndividialPostAdmin({ params }) {
  const router = useRouter();
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  let { data: user } = useQuery({
    queryKey: 'user',
    queryFn: isUserAuthenticated,
    staleTime: 1000 * 60 * 60 * 24 * 30,
  });

  let { data: post, isLoading } = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => {
      return getPostById(params.id);
    },
  });

  const onDeleteConfirm = async () => {
    await deletePost(params.id);
    setOpenDeleteModal(false);
    router.push('/admin/post');
  };

  if (isLoading) {
    return (
      <Container className="h-96 w-full flex justify-center items-center">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <PopupModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onDeleteConfirm}
      />
      <div className="flex flex-col gap-4">
        <Paper className="sm:p-4 p-2 rounded-md">
          <div className="flex flex-nowrap justify-between">
            <Typography variant="h4" className="text-2xl font-semibold">
              {post.title}
            </Typography>
            <IconButton
              sx={{
                // backgroundColor: 'primary.main',
                borderRadius: '50%',
              }}
              variant="outlined"
              color="error"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>

          <Typography
            variant="subtitle1"
            className="capitalize"
            color="text.secondary"
          >
            {post?.author?.name?.toLowerCase()}
          </Typography>
          <Typography variant="body1" className="mt-1">
            {post.description}
          </Typography>

          <Divider className="my-3" />
          <Box>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </Box>
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
        {showDiscussion && (
          <Discussion
            showDiscussion={showDiscussion}
            commentsType={post.comments}
            isAdmin={user.isAdmin}
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}
