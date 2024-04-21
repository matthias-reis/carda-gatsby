import { FC } from 'react';
import { Cross2Icon as CloseIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';

export const TagCloud: FC<{
  className: string;
  value?: string[];
  onChange: (tags: string[]) => void;
}> = ({ className, value = [], onChange }) => {
  return (
    <ul className={`flex gap-2 flex-wrap ${className}`}>
      {value.map((t) => (
        <li
          key={t}
          className="rounded-full bg-stone-800 font-condensed uppercase font-bold text-xs flex gap-1 items-center pl-3"
        >
          <span>{t}</span>
          <button
            className="rounded-full w-8 h-8 bg-stone-700 hover:bg-stone-900 grid place-content-center m-1"
            onClick={() => {
              const newList = value.filter((x) => x !== t);
              onChange(newList);
            }}
          >
            <CloseIcon />
          </button>
        </li>
      ))}
      <Input
        className="w-40"
        placeholder="noch eins"
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            const newList = [...value, ev.currentTarget.value];
            onChange(newList);
            ev.currentTarget.value = '';
          }
        }}
      />
    </ul>
  );
};
