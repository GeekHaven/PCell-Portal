import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
export function OfflineIndicator() {
  let [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(window.navigator.onLine);
      window.addEventListener('offline', () => {
        setIsOnline(false);
      });
      window.addEventListener('online', () => {
        setIsOnline(true);
      });
    }
  }, []);

  if (isOnline) return;

  return (
    <Box
      className="w-full absolute bottom-0 left-0 z-[1300] "
      sx={{
        backgroundColor: 'red',
      }}
    >
      <div className="flex flex-row gap-2 mx-auto w-fit items-center">
        <WarningIcon fontSize="12" />
        <div className="text-sm">You are offline!</div>
      </div>
    </Box>
  );
}
