import React from 'react';
import { useState, useRef } from 'react';
import {
  TextField,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Select from '@mui/material/Select';
import { Editor } from '@tinymce/tinymce-react';

import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import FileUpload from '@/components/FileUpload';
import SelectTargets from '@/components/SelectTargets';
import { addCompany } from '@/utils/API/admin/company';

const NewNotification = () => {
  const editorRef = useRef(null);
  const router = useRouter(),
    { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState(''),
    [description, setDescription] = useState(''),
    [body, setBody] = useState(''),
    [companyName, setCompanyName] = useState(''),
    [target, setTarget] = useState({
      groups: [],
      include: [],
      exclude: [],
    });

  let addCompanyMutation = useMutation(addCompany, {
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
    addCompanyMutation.mutate({
      companyName,
      techStack,
      files,
      target,
    });
  }


  const handleChange = (event) => {
    setCompanyName(event.target.value);
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setContent(editorRef.current.getContent());
    }
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

          <Container className="justify-start px-1 inline sm:flex">
            <Box className="flex justify-between items-center mr-5">
              <InputLabel id="demo-simple-select-label" className="mr-5">
                Choose Company
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyName}
                label="Company"
                onChange={handleChange}
              >
                <MenuItem value={'none'}>None</MenuItem>
                <MenuItem value={'google'}>Google</MenuItem>
                <MenuItem value={'microsoft'}>Microsoft</MenuItem>
                <MenuItem value={'linkedin'}>LinkedIn</MenuItem>
              </Select>
            </Box>
            <Box className="flex justify-between items-center">
              <FormControlLabel control={<Checkbox />} label="Allow Comments" />
            </Box>
          </Container>
        </div>

        <Container className="content w-full px-0 py-4 mx-0">
          <Editor
            apiKey="ah9w9dtmhnrt5yhzobg11p0jj9sdldd1x64lj89aipllnqn6"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Enter the Body of the Notification here. You can style it as you wish.</p>"
            init={{
              height: '100vh',
              toolbar_sticky: true,
              selector: 'textarea',
              skin: 'oxide-dark',
              content_css: 'dark',

              plugins: [
                'autolink lists advlist link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount quickbars',
              ],
              menubar: 'file edit view insert format tools table tc help',
              toolbar: [
                'undo redo | styles| bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | removeformat | code | help',
              ],

              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:17px }',
            }}
          />
        </Container>

        <SelectTargets target={target} setTarget={setTarget} />
        <Container
          maxWidth="xl"
          className="flex justify-end p-0 m-0"
          onClick={log}
        >
          <LoadingButton type="submit" variant="contained">
            Send Notification
          </LoadingButton>
        </Container>
      </Container>
    </>
  );
};

export default NewNotification;
