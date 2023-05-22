import {
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  IconButton,
  OutlinedInput,
} from '@mui/material';

import { useMemo } from 'react';

import CloseIcon from '@mui/icons-material/Close';

export default function GroupCard({ target, setTarget, userGroups, index }) {
  function deleteSelf() {
    setTarget((prev) => {
      let next = { ...prev };
      next.groups.splice(index, 1);
      return next;
    });
  }

  function changeProp(key, value) {
    setTarget((prev) => {
      let next = { ...prev };
      next.groups[index][key] = value;
      return next;
    });
  }

  function getOptionList(year) {
    if (!year) return false;
    let list = [...userGroups[year]];
    target.groups.forEach((group) => {
      if (group.year === year && group.program) {
        let pi = list.indexOf(group.program);
        if (pi !== -1) {
          list.splice(pi, 1);
        }
      }
    });
    return list;
  }

  let optionsList = useMemo(() => {
    return getOptionList(target.groups[index].year);
  }, [target]);

  let yearList = useMemo(() => {
    let list = Object.keys(userGroups).filter(
      (year) => getOptionList(year).length > 0
    );
    return list;
  }, [target]);

  return (
    <Paper elevation={4} className="group flex flex-col p-4 gap-3">
      <Typography variant="subtitle2" className="relative">
        <em>Group #1</em>
        <IconButton
          color="error"
          size="small"
          className="md:opacity-0 group-hover:opacity-100 absolute right-0 top-0 mt-[-4px] transition-opacity"
          onClick={deleteSelf}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Typography>
      <FormControl size="small" required>
        <InputLabel>Year</InputLabel>
        <Select
          value={target.groups[index]?.year}
          label="Year"
          onChange={(event) => changeProp('year', event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {target.groups[index].year !== '' && (
            <MenuItem value={target.groups[index].year}>
              {target.groups[index].year}
            </MenuItem>
          )}
          {yearList &&
            yearList.map((year, i) => (
              <MenuItem value={year} key={i}>
                {year}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl size="small" disabled={!optionsList} required>
        <InputLabel>Program</InputLabel>
        <Select
          value={target.groups[index]?.program}
          label="Program"
          onChange={(event) => changeProp('program', event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {target.groups[index].program !== '' && (
            <MenuItem value={target.groups[index].program}>
              {target.groups[index].program}
            </MenuItem>
          )}
          {optionsList &&
            optionsList.map((program, i) => (
              <MenuItem value={program} key={i}>
                {program}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        disabled={!target.groups[index].program}
        required
      >
        <InputLabel>Min CGPA</InputLabel>
        <OutlinedInput
          label="Min CGPA"
          placeholder="7.00"
          type="number"
          value={target.groups[index].minCGPA}
          inputProps={{ min: 0, max: 10, step: 0.1 }}
          onChange={(event) => {
            if (event.target.value === '') {
              return changeProp('minCGPA', '');
            }
            let value = Math.min(10, Math.max(0, event.target.value));
            changeProp('minCGPA', value);
          }}
        />
      </FormControl>
      <FormControl
        size="small"
        disabled={!target.groups[index].program}
        required
      >
        <InputLabel>Min Credits</InputLabel>
        <OutlinedInput
          label="Min Credits"
          placeholder="60"
          type="number"
          value={target.groups[index].minCredits}
          inputProps={{ min: 0, max: 200, step: 1 }}
          onChange={(event) => changeProp('minCredits', event.target.value)}
        />
      </FormControl>
    </Paper>
  );
}
