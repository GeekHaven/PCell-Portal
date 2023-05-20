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

import CloseIcon from '@mui/icons-material/Close';

export default function GroupCard() {
  return (
    <Paper elevation={4} className="group flex flex-col p-4 gap-3">
      <Typography variant="subtitle2" className="relative">
        <em>Group #1</em>
        <IconButton
          color="error"
          size="small"
          className="md:opacity-0 group-hover:opacity-100 absolute right-0 top-0 mt-[-4px] transition-opacity"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Typography>
      <FormControl size="small">
        <InputLabel>Year</InputLabel>
        <Select
          //   value={age}
          label="Year"
          //   onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Program</InputLabel>
        <Select
          //   value={age}
          label="Program"
          //   onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Min CGPA</InputLabel>
        <OutlinedInput
          label="Min CGPA"
          placeholder="7.00"
          type="number"
          inputProps={{ min: 0, max: 10, step: 0.1 }}
        />
      </FormControl>
      <FormControl size="small">
        <InputLabel>Min Credits</InputLabel>
        <OutlinedInput
          label="Min Credits"
          placeholder="60"
          type="number"
          inputProps={{ min: 0, max: 10, step: 1 }}
        />
      </FormControl>
    </Paper>
  );
}
