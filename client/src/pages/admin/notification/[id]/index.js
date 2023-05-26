import { Container, Divider, Box, Chip, Paper } from '@mui/material';
import React from 'react'

export default function IndividialNotificationAdmin() {
  return (
    <div className="">
      <Paper maxWidth="xl" className="px-8 py-8 my-4 rounded-md">
        <div className="flex justify-start gap-4 text-3xl font-bold">
          Title of the Notification
        </div>
        <div className="flex justify-start gap-4 text-lg mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odio
          nihil nemo dolor vitae totam optio quo neque earum quae sed sequi,
          unde quia adipisci! Possimus quo mollitia facere iure quae laboriosam
          nemo nisi, nihil beatae nesciunt quisquam dolores. Quas laboriosam
          porro quisquam quo officiis, tenetur non modi dolores dolorem!
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
            dangerouslySetInnerHTML={{ __html: 'Testing out the content' }}
          ></div>
        </Box>
      </Paper>
    </div>
  );
}
