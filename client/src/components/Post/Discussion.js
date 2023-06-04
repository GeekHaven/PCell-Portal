import React from 'react'
import { Paper } from '@mui/material';
import Comment from './Comment';
import Reply from './Reply';
import NewComment from './NewComment';


export default function Discussion() {
  return (
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
  );
}
