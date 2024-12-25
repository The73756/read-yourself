"use client";
import {Button} from "./ui/button";
import {Request} from "@/types/request";
import {BookDialog} from "./book-dialog";
import {useBookStore} from "@/store/book-store";
import {useRequestStore} from "@/store/request-store";
import {updateStatus} from "@/api/request-api";
import {useUserStore} from "@/store/user-store";
import {useEffect, useState} from "react";
import {Book} from "@/types/book";

interface RequestCardProps {
  request: Request;
}

const statuses = [
  {
    id: 2,
    name: "Принято"
  },
  {
    id: 3,
    name: "Завершено"
  },
  {
    id: 4,
    name: "Отклонено"
  }
]

export const AdminRequestCard = ({request}: RequestCardProps) => {
  const allBooks = useBookStore((state) => state.allBooks);
  const allRequests = useRequestStore((state) => state.allRequests);
  const setAllRequests = useRequestStore((state) => state.setAllRequests);
  const allUsers = useUserStore((state) => state.allUsers);

  const [currentUser, setCurrentUser] = useState(allUsers.find(u => u.id === request.userId))

  useEffect(() => {
    setCurrentUser(allUsers.find(u => u.id === request.userId))
  }, [allUsers]);

  const changeStatus = async (newStatusId: number) => {
    try {
      const res = await updateStatus(request.id, newStatusId)
      if (res) {
        setAllRequests(allRequests.map(req =>
          req.id === request.id ? {
              ...request,
              statusId: newStatusId,
              status: {
                id: statuses.find(st => st.id === newStatusId)?.id || request.status.id,
                name: statuses.find(st => st.id === newStatusId)?.name || request.status.name
              }
            }
            : req
        ))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          <h4 className="font-bold text-brown text-xl sm:text-2xl">
            До {request.returnDate}
          </h4>
          <p>{request.createDate}</p>
        </div>
        <h3
          className="text-brown text-lg">{`От ${currentUser?.surname} ${currentUser?.name[0]}.${currentUser?.patronymic[0]}.` || "От неизвестного"}
        </h3>
        {request.requestBooks.map((book) => (
          <div key={book.id}>
            {allBooks.find((currentBook) => currentBook.id === book.bookId) && (
              <BookDialog
                book={allBooks.find(
                  (currentBook) => currentBook.id === book.bookId
                ) as Book}
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
      {request.status.name === "В обработке" ? (
        <div className="flex gap-2">
          <Button onClick={() => changeStatus(2)}>Подтвердить</Button>
          <Button onClick={() => changeStatus(4)} variant="outline">Отменить</Button>
        </div>
      ) : (
        <Button onClick={() => changeStatus(3)}>Завершить</Button>
      )}
    </div>
  );
};
