import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { RouteVariant, useRoute } from './atoms/route';
import { EditorModule } from './EditorModule';
import { MediaModule } from './MediaModule';
import { SplashModule } from './SplashModule';

const modules: Record<RouteVariant, FC> = {
  default: SplashModule,
  editor: EditorModule,
  media: MediaModule,
};

export const Workplace: FC = () => {
  const [route] = useRoute();

  const Module = modules[route];

  return (
    <Box sx={{ width: '100%' }}>
      <Module />
    </Box>
  );
};
