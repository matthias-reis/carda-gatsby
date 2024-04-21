import { FC, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

export const DatePicker: FC<{
  id?: string;
  value: Date;
  onChange: (date: Date | undefined) => void;
}> = ({ id, value, onChange, ...props }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={'outline'}
          className={`w-full justify-start text-left font-normal`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'yyyy-MM-dd') : <span>Datum wählen ...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
