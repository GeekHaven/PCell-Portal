import { Avatar, Container, Typography, Chip, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';
import Link from 'next/link';


export const Post = (props) => {
  const basrUrl = 'admin/post/';
  return (
    <div>
      <Paper
        elevation={1}
        className="border-2 border-solid rounded-md py-1 px-2 gap-2"
        sx={{
          borderColor: 'divider',
        }}
      >
        <Container className="flex flex-col gap-1 p-2" maxWidth="xl">
          <Typography variant="h6">{props.title}</Typography>
          <Box className=" mb-2 flex flex-nowrap gap-2 items-center">
            <Avatar
              className="h-4 w-4"
              sx={{
                bgcolor: 'primary.main',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {props.company}
            </Typography>
            ·
            <Typography variant="caption" color="text.secondary">
              {moment(Date.now()).fromNow()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-3 sm:line-clamp-2"
          >
            {props.description}
          </Typography>
          <Box className="flex flex-wrap gap-2 pt-2 pb-1">
            <Link href={basrUrl + props.id}>
              <Chip
                variant="outlined"
                label="Read More"
                color="primary"
                className="font-semibold"
              />
            </Link>
          </Box>
        </Container>
      </Paper>
    </div>
  );
};

export default Post;
