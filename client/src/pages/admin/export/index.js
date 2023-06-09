import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { debounce } from '@mui/material/utils';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';

import { post } from '@/utils/API/request';
import SelectTargets from '@/components/SelectTargets';

let allColumns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'rollNumber',
    headerName: 'Roll Number',
    width: 100,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 100,
  },
  {
    field: 'cgpa',
    headerName: 'CGPA',
    width: 50,
  },
  {
    field: 'resumeLink',
    headerName: 'Resume Link',
    width: 150,
  },
  {
    field: 'currentSem',
    headerName: 'Current Sem',
    width: 50,
  },
  {
    field: 'completedCredits',
    headerName: 'Completed Credits',
    width: 50,
  },
  {
    field: 'totalCredits',
    headerName: 'Total Credits',
    width: 50,
  },
];

export default function ExportUsers() {
  let router = useRouter();

  let [columns, setColumns] = useState([allColumns.at(0), allColumns.at(1)]);
  let [users, setUsers] = useState([]);
  let [targets, setTargets] = useState({
    groups: [],
    include: [],
    exclude: [],
  });

  let getUsersEligibleForTarget = useCallback(
    async function () {
      let modifiedGroups = targets.groups.map((group) => {
        return {
          year: Number.parseInt(group.year),
          program: group.program,
          minCGPA: Number.parseFloat(group.minCGPA),
          minCredits: Number.parseInt(group.minCredits),
        };
      });
      let {
        data: { data },
      } = await post('/admin/user/targetEligible', {
        targets: {
          groups: modifiedGroups,
          include: targets.include,
          exclude: targets.exclude,
        },
      });
      return data;
    },
    [targets]
  );

  let getUserList = useMemo(
    () =>
      debounce(async (callback) => {
        return callback(await getUsersEligibleForTarget());
      }, 250),
    [targets]
  );

  useEffect(() => {
    getUserList((users) => {
      setUsers(users);
    });
  }, [targets]);

  useEffect(() => {
    if (router.query?.targets) {
      let targets = JSON.parse(router.query.targets);
      setTargets(targets);
    }
  }, []);

  return (
    <Box>
      <SelectTargets target={targets} setTarget={setTargets} />
      <Box className="flex flex-row justify-between items-baseline flex-wrap my-4">
        <Typography variant="body2">{users.length} Students Shown</Typography>
        <Button
          variant="contained"
          color="success"
          endIcon={<FileDownloadIcon />}
        >
          Export to CSV
        </Button>
      </Box>
      <FormControl fullWidth>
        <InputLabel>Select Columns</InputLabel>
        <Select
          multiple
          label="Select Columns"
          value={columns}
          renderValue={(value) => {
            return (
              <Box className="text-ellipsis">
                {value.map((col) => col.headerName).join(', ')}
              </Box>
            );
          }}
          onChange={(e) => setColumns(e.target.value)}
        >
          {allColumns.map((column) => (
            <MenuItem key={column.field} value={column}>
              <Checkbox
                checked={
                  columns.find((col) => col.field === column.field) !==
                  undefined
                }
              />
              {column.headerName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper elevation={4} className="w-full p-2 mt-4">
        <TableContainer className="max-h-96 overflow-auto">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Sr.</TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{
                      minWidth: column.width,
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center border-0"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
              {users.map((user, index) => (
                <TableRow key={user.rollNumber} hover>
                  <TableCell>{index + 1}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {user[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
