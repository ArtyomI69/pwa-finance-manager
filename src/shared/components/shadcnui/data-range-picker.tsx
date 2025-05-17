'use client';

import * as React from 'react';
import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/shared/utils/cn';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useEffect } from 'react';

export function DatePickerWithRange({
  className,
  onChangeDate,
}: React.HTMLAttributes<HTMLDivElement> & { onChangeDate: (date: DateRange) => void }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(Date.now()), 7),
    to: new Date(Date.now()),
  });

  const firstUpdate = React.useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    onChangeDate(date!);
  }, [date?.from, date?.to]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: ru })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale: ru })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: ru })
              )
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
