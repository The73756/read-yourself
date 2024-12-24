import {Book} from "@/types/book";
import Image from "next/image";
import {Button} from "./ui/button";
import {BookDialog} from "./book-dialog";
import {CustomDialog} from "@/components/custom-dialog";
import {CreateRequestForm} from "@/components/create-request-form";
import {useUserStore} from "@/store/user-store";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({book}: BookCardProps) => {
  const isAuth = useUserStore((state) => state.isAuth);

  return (
    <div className="flex flex-col justify-between rounded-t-md overflow-hidden gap-6 sm:max-w-[430px]">
      <div className="flex items-center w-full bg-beige h-full">
        <Image
          className="w-full h-auto object-content overflow-auto"
          src={book.image}
          alt={book.title}
          width={430}
          height={500}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <BookDialog book={book}/>
          <p className="text-brown">{book.author.name}</p>
        </div>
        <CustomDialog
          trigger={<Button disabled={!isAuth}>Забронировать</Button>}
          title="Заявка на бронь книг"
        >
          <CreateRequestForm currentBooks={[book]}/>
        </CustomDialog>
      </div>
    </div>
  );
};
