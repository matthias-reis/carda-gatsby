import { Message, MessageLevel } from './types';
import { atom, useAtom } from 'jotai';

const messagesAtom = atom<Message[]>([]);

export const useAddMessage = () => {
  const addMessage = (
    module: string,
    message: string,
    level: MessageLevel = 'info'
  ) => {
    console[level](module, message);
  };
  return addMessage;
};

export const useMessages = () => {
  const [allMessages, setAllMessages] = useAtom(messagesAtom);

  const fetchMessages = async () => {
    const messages: Message[] = await fetch('/log').then((res) => res.json());
    setAllMessages(messages);
  };

  return { fetchMessages, messages: allMessages };
};
