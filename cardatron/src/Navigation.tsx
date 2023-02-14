import { Article, LibraryAdd, Image } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import { FC } from 'react';
import { RouteVariant, useRoute } from './logic/route';
import { Logo } from './Logo';

const items: Item[] = [
  {
    name: 'Neuer Beitrag',
    icon: LibraryAdd,
    handler: () => console.log(1),
  },
  {
    name: 'Editieren',
    icon: Article,
    handler: (setter) => setter('editor'),
  },
  {
    name: 'Medienmanager',
    icon: Image,
    handler: (setter) => setter('media'),
  },
];

export const Navigation: FC = () => {
  const { setRoute } = useRoute();

  return (
    <Paper elevation={1} sx={{ height: '100vh' }}>
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <Logo width={48} height={48} />
        <List sx={{ mt: 6 }}>
          {items.map((item) => {
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
                      item.handler(setRoute);
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
  handler: (setter: (value: RouteVariant) => void) => void;
};
