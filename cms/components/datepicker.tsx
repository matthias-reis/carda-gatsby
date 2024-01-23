import { FC, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

export const DatePicker: FC<{ id?: string }> = ({ id, ...props }) => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={'outline'}
          className={`w-full justify-start text-left font-normal`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
