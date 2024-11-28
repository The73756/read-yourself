import { Button } from "./ui/button";
import { Request } from "@/types/request";
import { BookDialog } from "./book-dialog";

interface RequestCardProps {
  request: Request;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-3">
          <h4 className="font-bold text-brown text-xl sm:text-2xl">
            До {request.returnDate}
          </h4>
          <p>{request.createDate}</p>
        </div>
        {request.books.map((book) => (
          <div key={book.id}>
            <BookDialog book={book} />
            <p className="text-brown">{book.author.name}</p>
          </div>
        ))}
        <Button variant="outline">Закрыть</Button>
      </div>
    </div>
  );
};
