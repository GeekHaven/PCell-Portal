import { Container, Divider, Box, Chip, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '@/contexts/theme.context';
import Comment from '@/components/Post/Comment';
import Reply from '@/components/Post/Reply';
import NewComment from '@/components/Post/NewComment';
import { useQuery } from 'react-query';
import { getPostById } from '@/utils/API/admin/post';
import { CircularProgress } from '@mui/material';


export default function IndividialPostAdmin({params}) {

    let { data: post, isLoading } = useQuery({
      queryKey: ['post'],
      queryFn: ()=>{
        return getPostById(params.id);
      },
    });

    if (isLoading) {
      return (
        <Container className="h-96 w-full flex justify-center items-center">
          <CircularProgress />
        </Container>
      );
    }

    console.log(post);

  return (
    <div className="">
      <Paper maxWidth="xl" className="px-8 py-8 my-4 rounded-md">
        <div className="flex justify-start gap-4 text-3xl font-bold">
          {post.title}
        </div>
        <div className="flex justify-start gap-4 text-lg mt-4">
          {post.description}
        </div>
        <Box className="flex flex-wrap gap-2 pt-2 pb-1 mt-2">
          <Chip
            variant="outlined"
            label="Amazon"
            color="primary"
            className="font-semibold"
          />
          <Chip
            variant="outlined"
            label="Placement"
            color="primary"
            className="font-semibold"
          />
        </Box>
        <Divider className="my-3" />

        <Box maxWidth="xl">
          <div
            className="content mb-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </Box>
      </Paper>

      <Paper maxWidth="xl" className="px-8 py-8 my-4 rounded-md">
        <section className="  py-8 lg:py-0 px-2">
          <div className=" mx-auto px-0">
            <NewComment />
            <Comment />
            <Reply />
            <Comment />
          </div>
        </section>
      </Paper>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      params: context.params,
    },
  };
}