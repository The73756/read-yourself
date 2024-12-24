"use client";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale"; // Импортируем локаль для русского языка
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction } from "react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP", { locale: ru })
          ) : (
            <span>Выберите дату возврата книг</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="-top-[210px] left-1/2 absolute p-0 w-auto -translate-x-1/2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            if (selectedDate) {
              console.log(format(selectedDate, "dd.MM.yyyy"));
            }
          }}
          disabled={(date) =>
            date < addDays(new Date(), -1) || date > addDays(new Date(), 10)
          }
          initialFocus
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  );
};
