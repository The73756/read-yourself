"use client";
import { Button } from "./ui/button";
import { Request } from "@/types/request";
import { BookDialog } from "./book-dialog";
import { useBookStore } from "@/store/book-store";

interface RequestCardProps {
  request: Request;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const allBooks = useBookStore((state) => state.allBooks);

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          {request.status.name === "Завершено" ? (
            <h4 className="font-bold text-brown text-xl sm:text-2xl">
              {request.createDate} - {request.returnDate}
            </h4>
          ) : (
            <>
              <h4 className="font-bold text-brown text-xl sm:text-2xl">
                До {request.returnDate}
              </h4>
              <p>{request.createDate}</p>
            </>
          )}
        </div>
        {request.requestBooks.map((book) => (
          <div key={book.id}>
            {allBooks.find((currentBook) => currentBook.id === book.bookId) && (
              <BookDialog
                book={allBooks.find(
                  (currentBook) => currentBook.id === book.bookId
                )}
              />
            )}
            <p className="text-brown">
              {
                allBooks.find((currentBook) => currentBook.id === book.bookId)
                  ?.author.name
              }
            </p>
          </div>
        ))}
      </div>
      {request.status.name === "Принято" ||
        (request.status.name === "В обработке" ? (
          <Button variant="outline">Отменить</Button>
        ) : (
          <Button>Повторить</Button>
        ))}
    </div>
  );
};
