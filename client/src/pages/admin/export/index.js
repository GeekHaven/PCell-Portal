import { Box } from '@mui/material';
import { useState } from 'react';

import SelectTargets from '@/components/SelectTargets';

export default function ExportUsers() {
  let [targets, setTargets] = useState({
    groups: [],
    include: [],
    exclude: [],
  });

  return (
    <Box>
      <SelectTargets target={targets} setTarget={setTargets} />
    </Box>
  );
}
