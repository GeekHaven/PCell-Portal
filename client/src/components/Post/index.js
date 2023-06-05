import {
  Avatar,
  Container,
  Typography,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Post = (props) => {
  const router = useRouter();
  return (
    <Button
      className="w-full h-full"
      sx={{
        outlineColor: 'secondary.main',
        padding: '0px',
      }}
      onClick={() => {
        router.push(props.baseUrl + props.id);
      }}
    >
      <div className="w-full">
        <Paper
          elevation={1}
          className="border-2 border-solid rounded-md py-1 px-2 gap-2 w-full"
          sx={{
            borderColor: 'divider',
          }}
        >
          <Container className="flex flex-col gap-1 p-2 w-full" maxWidth="xl">
            <Typography variant="h6" className="text-left capitalize">
              {props.title}
            </Typography>
            <Box className=" mb-2 flex flex-nowrap gap-2 items-center normal-case">
              {props.company && (
                <>
                  <Typography variant="caption" color="text.secondary">
                    {props.company}
                  </Typography>
                  {' • '}
                </>
              )}
              <Typography variant="caption" color="text.secondary">
                {moment(Date.now()).fromNow()}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              className="line-clamp-3 sm:line-clamp-2 text-left normal-case"
            >
              {props.description}
            </Typography>
            <Box className="flex flex-wrap gap-2 pt-2 pb-1">
              <Link href={props.baseUrl + props.id}>
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
    </Button>
  );
};

export default Post;
