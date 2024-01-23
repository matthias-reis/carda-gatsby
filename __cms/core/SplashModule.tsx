import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Logo } from './Logo';

export const SplashModule: FC = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', width: '100%' }}
    >
      <Logo width={256} height={256} />
      <Typography variant="h3" sx={{ opacity: 0.3, fontWeight: 'bold' }}>
        Anne CMS
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 300 }}>
        Sounds Vegan Content Management
      </Typography>
    </Stack>
  );
};
