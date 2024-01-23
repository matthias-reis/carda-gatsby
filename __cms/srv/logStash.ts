import { Message, MessageLevel } from '@/core/logic/types';

const logStash: Message[] = [];

export function getLogs() {
  return logStash.sort((a, b) => b.time - a.time);
}

export function addLog(message: Message) {
  logStash.push(message);
}

export function addLocalLog(
  module: string,
  message: string,
  level: MessageLevel = 'info'
) {
  const time = Date.now();
  const messageItem: Message = { module, level, time, message };
  addLog(messageItem);
}
