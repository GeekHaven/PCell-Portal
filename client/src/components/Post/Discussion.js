import React from 'react'
import { Paper } from '@mui/material';
import Comment from './Comment';
import Reply from './Reply';
import NewComment from './NewComment';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getComments } from '@/utils/API/admin/post';
import { useRouter } from 'next/router';


export default function Discussion({ params, showDiscussion }) {
    const router = useRouter();
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  
  const { data: allComments, commentsLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: () => {
      return getComments(router.query.id);
    },
    onSuccess: (data) => {
      console.log(data);
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
    <Paper maxWidth="xl" className="px-8 py-8 my-4 rounded-md">
      <section className="  py-8 lg:py-0 px-2">
        <div className=" mx-auto px-0">
          <NewComment setComments={setComments} comments={comments}/>

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
      </section>
    </Paper>
  );
}

