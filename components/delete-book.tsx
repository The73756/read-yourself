import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { DialogClose } from "./ui/dialog";

interface DeleteBookProps {
  book: Book;
}

export const DeleteBook = ({ book }: DeleteBookProps) => {
  return (
    <>
      <p>
        Вы точно хотите удалить книгу &quot;{book.title}&quot;{" "}
        {book.author.name}?
      </p>
      <div className="flex gap-2 md:gap-5">
        <Button className="w-full">Удалить</Button>
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      </div>
    </>
  );
};
