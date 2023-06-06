import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Container,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Divider,
} from '@mui/material';
import Select from '@mui/material/Select';
import { Editor } from '@tinymce/tinymce-react';

import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import SelectTargets from '@/components/SelectTargets';
import { getAllCompanies } from '@/utils/API/admin/company';
import { addPost } from '@/utils/API/admin/post';

const NewPost = () => {
  const editorRef = useRef(null);
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState(''),
    [description, setDescription] = useState(''),
    [content, setContent] = useState(''),
    [companyNames, setCompanyNames] = useState(''),
    [companyName, setCompanyName] = useState('none'),
    [comments, setComments] = useState('public'),
    [target, setTarget] = useState({
      groups: [],
      include: [],
      exclude: [],
    });

  const AllCompanies = useMutation(getAllCompanies, {
    onSuccess: (data) => {
      setCompanyNames(data);
    },
  });

  useEffect(() => {
    AllCompanies.mutate();
  }, []);

  let addPostMutation = useMutation(addPost, {
    onSuccess: (data) => {
      enqueueSnackbar('Post sent successfully', { variant: 'success' });
      router.push('/admin/post');
    },
    onError: (err) => {
      enqueueSnackbar(err, { variant: 'error' });
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    addPostMutation.mutate({
      title,
      description,
      companyName,
      comments,
      target,
      content,
    });
  }

  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  const handleChangeComment = (event) => {
    setComments(event.target.value);
  };

  const handleChange = (event) => {
    setCompanyName(event.target.value);
  };

  return (
    <>
      <Typography variant="subtitle1" className="-mt-2" color="primary">
        Create Post
      </Typography>
      <Divider className="mb-4 mt-2" />
      <Container
        component="form"
        className="flex flex-col items-center gap-4 m-0 p-0"
        maxWidth="xl"
        onSubmit={onSubmit}
      >
        <div className="flex flex-row w-full flex-wrap gap-4 justify-between">
          <TextField
            label="Post Title"
            required
            placeholder="Enter the title for the post"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Brief Post Description"
            placeholder="Enter a brief description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <Container maxWidth="xl" className="justify-start inline p-0 sm:flex">
            <Box className="flex w-full items-center gap-2">
              <FormControl className="w-40">
                <InputLabel className="mr-5">Choose Company</InputLabel>
                <Select
                  value={companyName}
                  label="Choose Company"
                  onChange={handleChange}
                >
                  <MenuItem value={'none'}>None</MenuItem>
                  {companyNames &&
                    companyNames.map((company, i) => (
                      <MenuItem value={company.name} key={i}>
                        {company.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className="w-40">
                <InputLabel className="mr-5">Choose Comments Type</InputLabel>
                <Select
                  value={comments}
                  label="Choose Comeents Type"
                  onChange={handleChangeComment}
                >
                  <MenuItem value={'disabled'}>Disabled</MenuItem>
                  <MenuItem value={'public'}>Public</MenuItem>
                  <MenuItem value={'private'}>Private</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Container>
        </div>

        <Container
          maxWidth="xl"
          className="admin-content w-full px-0 py-4 mx-0"
        >
          <Editor
            onChange={log}
            apiKey="ah9w9dtmhnrt5yhzobg11p0jj9sdldd1x64lj89aipllnqn6"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: '90vmin',
              toolbar_sticky: true,
              toolbar_sticky_offset: 64,
              selector: 'textarea',
              skin: 'oxide-dark',
              content_css: 'dark',
              statusbar: false,
              plugins: [
                'autolink lists advlist link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount quickbars',
              ],
              menubar: false,
              toolbar: [
                'styles| bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | removeformat | code | help',
              ],
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:17px }',
            }}
          />
        </Container>

        <SelectTargets target={target} setTarget={setTarget} />
        <Container maxWidth="xl" className="flex justify-end p-0 m-0">
          <LoadingButton type="submit" variant="contained">
            Send Post
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default NewPost;
