import { atom, useAtomValue, useSetAtom } from 'jotai';

type Level = 'info' | 'warn' | 'error';

export type Message = {
  level: Level;
  time: number; // timestamp
  module: string;
  message: string;
};

const messagesAtom = atom<Message[]>([]);

const addMessageAtom = atom<Omit<Message, 'time'>>(
  null,
  (get, set, message: Message) => {
    const newMessage = { ...message, time: Date.now() };
    set(messagesAtom, (messages) => [...messages, newMessage]);
  }
);

export const useAddMessage = () => {
  const setMessages = useSetAtom(messagesAtom);
  const addMessage = (
    module: string,
    message: string,
    level: Level = 'info'
  ) => {
    const time = Date.now();
    setMessages((messages) => [...messages, { module, level, time, message }]);
  };
  return addMessage;
};

export const useMessages = () => {
  const messages = useAtomValue(messagesAtom);

  return messages.sort((a, b) => b.time - a.time);
};
