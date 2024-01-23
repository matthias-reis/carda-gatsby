import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Logo } from './Logo';

export const WaitModule: FC = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', width: '100%' }}
    >
      <Box sx={{ width: '100px' }}>
        <LinearProgress />
      </Box>
    </Stack>
  );
};
