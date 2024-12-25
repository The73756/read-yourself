"use client";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Button} from "./ui/button";
import {MouseEvent, useState} from "react";
import {Book} from "@/types/book";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useBookStore} from "@/store/book-store";
import {DatePicker} from "./date-picker";
import {format} from "date-fns";
import {createRequest} from "@/api";
import {useUserStore} from "@/store/user-store";
import {useRequestStore} from "@/store/request-store";
import {DialogClose} from "./ui/dialog";

interface CreateRequestFormProps {
  currentBooks?: Book[];
}

export const CreateRequestForm = ({currentBooks}: CreateRequestFormProps) => {
  const allBooks = useBookStore((state) => state.allBooks);
  const user = useUserStore((state) => state.user);
  const requests = useRequestStore((state) => state.requests);
  const setRequests = useRequestStore((state) => state.setRequests);

  const [date, setDate] = useState<Date>();
  const [selectedBooks, setSelectedBooks] = useState<Book[]>(
    currentBooks?.length && currentBooks?.length > 0 ? currentBooks : []
  );
  const [requestBooks, setRequestBooks] = useState<Book[]>(
    currentBooks?.length && currentBooks?.length > 0 ? currentBooks : []
  );
  const [value, setValue] = useState("")

  const handleSelectItemClick = (book: Book) => {
    if (!selectedBooks.some((selectedBook) => selectedBook.id === book.id)) {
      setSelectedBooks([...selectedBooks, book]);
      setRequestBooks([...requestBooks, book]);
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const selectedBook = allBooks.find((book) => book.title === newValue);
    if (selectedBook) {
      handleSelectItemClick(selectedBook);
    }
  };

  const handleToggle = (e: MouseEvent<HTMLButtonElement>, value: Book) => {
    if (e.currentTarget.dataset.state === "on") {
      e.currentTarget.dataset.state = "off";
      setRequestBooks(
        requestBooks.filter((requestBook) => requestBook.id !== value.id)
      );
    } else {
      e.currentTarget.dataset.state = "on";
      setRequestBooks([...requestBooks, value]);
    }
  };

  const submitForm = async () => {
    try {
      const res = await createRequest(
        user.id,
        format(date || new Date() , "dd.MM.yyyy"),
        format(new Date(), "dd.MM.yyyy"),
        requestBooks
      );
      setRequests([...requests, res]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {selectedBooks.length > 0 && (
        <ToggleGroup type="multiple">
          {selectedBooks.map((book) => (
            <ToggleGroupItem
              key={book.id}
              onClick={(e) => handleToggle(e, book)}
              data-state="on"
              value={book.title}
            >
              {book.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
      <div className="flex flex-col gap-4">
        <Select value={value} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue aria-label={value} placeholder="Выберите книгу">
              {allBooks.find((book) => book.title === value)?.title}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {allBooks.map((book) => (
              <SelectItem key={book.id} value={book.title}>
                {book.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate}/>
      </div>
      <DialogClose asChild>
        <Button
          className="w-full"
          disabled={requestBooks.length <= 0 || date == undefined}
          onClick={submitForm}
        >
          Создать заявку
        </Button>
      </DialogClose>
    </>
  );
};
