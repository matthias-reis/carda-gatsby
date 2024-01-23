import {
  Article,
  LibraryAdd,
  Image,
  Visibility,
  Terminal,
  JoinLeft,
  JoinRight,
} from '@mui/icons-material';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import { FC } from 'react';
import { LeftRoute, RightRoute, useRoute } from './logic/route';
import { Logo } from './Logo';

const leftItems: Item[] = [
  {
    name: 'Neuer Beitrag',
    icon: LibraryAdd,
    route: 'new',
  },
  {
    name: 'Editieren',
    icon: Article,
    route: 'editor',
  },
];

const rightItems: Item[] = [
  {
    name: 'Browser',
    icon: Visibility,
    route: 'viewer',
  },
  {
    name: 'Medienmanager',
    icon: Image,
    route: 'media',
  },
  {
    name: 'protokoll',
    icon: Terminal,
    route: 'protocol',
  },
];

export const Navigation: FC = () => {
  const { setLeftRoute, setRightRoute } = useRoute();

  return (
    <Paper elevation={1} sx={{ height: '100vh' }}>
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <Logo width={48} height={48} />
        <List sx={{ mt: 4 }}>
          <Divider sx={{ my: 2 }} />
          <ListItem>
            <JoinLeft sx={{ opacity: 0.3 }} />
          </ListItem>
          {leftItems.map((item) => {
            const Icon = item.icon;
            return (
              <ListItem
                disablePadding
                sx={{
                  display: 'block',
                  mt: 2,
                }}
                key={item.name}
              >
                <Tooltip title={item.name}>
                  <ListItemButton
                    onClick={() => {
                      setLeftRoute(item.route as LeftRoute);
                    }}
                    sx={{
                      margin: 0,
                      width: '56px',
                      justifyContent: 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: 'center',
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
          <Divider sx={{ my: 2 }} />

          <ListItem>
            <JoinRight sx={{ opacity: 0.3 }} />
          </ListItem>
          {rightItems.map((item) => {
            const Icon = item.icon;
            return (
              <ListItem
                disablePadding
                sx={{
                  display: 'block',
                  mt: 2,
                }}
                key={item.name}
              >
                <Tooltip title={item.name}>
                  <ListItemButton
                    onClick={() => {
                      setRightRoute(item.route as RightRoute);
                    }}
                    sx={{
                      margin: 0,
                      width: '56px',
                      justifyContent: 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: 'center',
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </Paper>
  );
};

type Item = {
  name: string;
  icon: FC;
  route: LeftRoute | RightRoute;
};
