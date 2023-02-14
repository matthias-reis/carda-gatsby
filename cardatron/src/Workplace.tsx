import { Box } from '@mui/material';
import { FC } from 'react';
import { RouteVariant, useRoute } from './logic/route';
import { EditorModule } from './EditorModule';
import { MediaModule } from './MediaModule';
import { SplashModule } from './SplashModule';

const modules: Record<RouteVariant, FC> = {
  default: SplashModule,
  editor: EditorModule,
  media: MediaModule,
};

export const Workplace: FC = () => {
  const { route } = useRoute();

  const Module = modules[route];

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Module />
    </Box>
  );
};
