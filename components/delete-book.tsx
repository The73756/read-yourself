import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { DialogClose } from "./ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { deleteBook } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useBookStore } from "@/store/book-store";

interface DeleteBookProps {
  book: Book;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteBook = ({ book, setOpen }: DeleteBookProps) => {
  const setAllBooks = useBookStore((state) => state.setAllBooks);
  const allBooks = useBookStore((state) => state.allBooks);
  const { toast } = useToast();

  async function onSubmit() {
    try {
      const deletedBook = await deleteBook(book.id);
      if (deletedBook) {
        setAllBooks(allBooks.filter((b) => b.id !== book.id));
        setOpen(false);
        toast({
          title: "Книга успешно удалена",
        });
      } else {
        toast({
          title: "Ошибка удаления",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <p>
        Вы точно хотите удалить книгу &quot;{book.title}&quot;{" "}
        {book.author.name}?
      </p>
      <div className="flex gap-2 md:gap-5">
        <Button onClick={onSubmit} className="w-full">
          Удалить
        </Button>
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      </div>
    </>
  );
};
