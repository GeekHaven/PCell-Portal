import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import Select from '@mui/material/Select';
import { Editor } from '@tinymce/tinymce-react';

import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import FileUpload from '@/components/FileUpload';
import SelectTargets from '@/components/SelectTargets';
import { addCompany, getAllCompanies } from '@/utils/API/admin/company';
import { addNotification } from '@/utils/API/admin/notification';

const NewPost = () => {
  const editorRef = useRef(null);
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState(''),
    [description, setDescription] = useState(''),
    [content, setContent] = useState(''),
    [companyNames, setCompanyNames] = useState(''),
    [companyName, setCompanyName] = useState('none'),
    [comments, setComments] = useState(true),
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

  let addNotificationMutation = useMutation(addNotification, {
    onSuccess: (data) => {
      enqueueSnackbar('Company added successfully', { variant: 'success' });
      router.push('/admin/company');
    },
    onError: (err) => {
      enqueueSnackbar(err, { variant: 'error' });
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    addNotificationMutation.mutate({
      title,
      description,
      companyName,
      comments: !comments,
      content,
      target,
    });
  }

  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  const handleChange = (event) => {
    setCompanyName(event.target.value);
  };

  return (
    <>
      <Container
        component="form"
        className="flex flex-col items-center gap-4"
        maxWidth="xl"
        onSubmit={onSubmit}
      >
        <div className="flex flex-row w-full flex-wrap gap-4 justify-between">
          <Container
            maxWidth="xl"
            className="w-fit flex-grow flex flex-nowrap justify-around items-center gap-4 flex-col m-0 p-0"
          >
            <TextField
              label="Notification Title"
              required
              placeholder="Enter the title for the Notification"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Brief Notification Description"
              placeholder="Enter a brief description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Container>

          <Container
            maxWidth="xl"
            className="justify-start px-1 inline sm:flex"
          >
            <Box className="flex justify-between items-center mr-5">
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
            </Box>
            <Box className="flex justify-between items-center">
              <FormControlLabel
                control={<Checkbox />}
                label="Allow Comments"
                value={comments}
                onChange={() => {
                  setComments(!comments);
                }}
              />
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
            initialValue="<p>Enter the Body of the Notification here. You can style it as you wish.</p>"
            init={{
              height: '90vmin',
              toolbar_sticky: true,
              toolbar_sticky_offset: 64,
              selector: 'textarea',
              skin: 'oxide-dark',
              content_css: 'dark',
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
            Send Notification
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default NewPost;
