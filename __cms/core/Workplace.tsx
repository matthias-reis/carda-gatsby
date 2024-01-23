import { Box } from '@mui/material';
import { FC } from 'react';
import { LeftRoute, RightRoute, useRoute } from './logic/route';
import { EditorModule } from './EditorModule';
import { MediaModule } from './MediaModule';
import { WaitModule } from './WaitModule';
import { SplashModule } from './SplashModule';
import { NewModule } from './NewModule';
import { ViewerModule } from './ViewerModule';
import { ProtocolModule } from './ProtocolModule';

const leftModules: Record<LeftRoute, FC> = {
  wait: WaitModule,
  splash: SplashModule,
  editor: EditorModule,
  new: NewModule,
};
const rightModules: Record<RightRoute, FC> = {
  wait: WaitModule,
  viewer: ViewerModule,
  media: MediaModule,
  protocol: ProtocolModule,
};

export const WorkplaceLeft: FC = () => {
  const { leftRoute } = useRoute();

  const LeftModule = leftModules[leftRoute];

  return (
    <Box
      sx={{
        width: '700px',
        height: '100vh',
        overflow: 'hidden',
        flex: '0 0 auto',
        borderRight: '1px solid grey',
      }}
    >
      <LeftModule />
    </Box>
  );
};

export const WorkplaceRight: FC = () => {
  const { rightRoute } = useRoute();

  const RightModule = rightModules[rightRoute];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        flex: '1 1 auto',
      }}
    >
      <RightModule />
    </Box>
  );
};
