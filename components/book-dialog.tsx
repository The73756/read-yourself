import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "@/types/book";

interface BookDialogProps {
  book: Book;
}

export const BookDialog = ({ book }: BookDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="max-w-full text-black text-left text-lg text-wrap"
        >
          {book.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-sm:flex-wrap gap-6 max-w-[900px] max-sm:h-dvh max-h-dvh overflow-y-auto">
        <div className="flex min-w-[250px] md:min-w-[300px] sm:max-w-[330px] self-start">
          <Image src={book.image} alt={book.title} width={530} height={500} />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle className="text-2xl">{book.title}</DialogTitle>
            <DialogDescription className="text-base text-brown">
              {book.author.name}
            </DialogDescription>
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-brown/50">
              <span>{book.year} год</span>
              <span>{book.genre.name}</span>
            </p>
          </DialogHeader>
          <p>{book.desc}</p>
          <DialogFooter className="mt-auto">
            <Button className="w-full">Забронировать</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
