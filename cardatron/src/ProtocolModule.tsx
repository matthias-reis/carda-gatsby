import { FC } from 'react';
import { Message, useMessages } from './logic/messages';
import { Stack, Typography as T } from '@mui/material';

export const ProtocolModule: FC = () => {
  const messages = useMessages();
  return (
    <Stack gap={2} sx={{ p: 3 }}>
      {messages.map((message) => (
        <MessageItem payload={message} key={message.time} />
      ))}
    </Stack>
  );
};

const MessageItem: FC<{ payload: Message }> = ({ payload }) => {
  const t = new Date(payload.time);
  const icons = { info: 'ℹ️', error: '❌', warn: '⚠️' };
  return (
    <Stack>
      <T variant="body2" color="GrayText">
        {`${t.getHours()}`.padStart(2, '0')}:
        {`${t.getMinutes()}`.padStart(2, '0')}:
        {`${t.getSeconds()}`.padStart(2, '0')}.
        {`${t.getMilliseconds()}`.padStart(3, '0')}
      </T>
      <T variant="body1">
        {icons[payload.level]} <strong>{payload.module}:</strong>{' '}
        {payload.message}
      </T>
    </Stack>
  );
};
