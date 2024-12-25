"use client";
import {useBookStore} from "@/store/book-store";
import {RequestCard} from "./request-card";
import {getRequests} from "@/api";
import {useRequestStore} from "@/store/request-store";
import {useUserStore} from "@/store/user-store";
import {Book} from "@/types/book";
import {useEffect} from "react";

interface UserRequestListProps {
  data: Book[];
}

export const UserRequestList = ({data}: UserRequestListProps) => {
  const user = useUserStore((state) => state.user);
  const requests = useRequestStore((state) => state.requests);
  const setRequests = useRequestStore((state) => state.setRequests);

  const setAllBooks = useBookStore((state) => state.setAllBooks);

  const processRequests = requests.filter(
    (request) => request.status.name === "В обработке"
  );
  const activeRequests = requests.filter(
    (request) => request.status.name === "Принято"
  );
  const finishRequests = requests.filter(
    (request) => request.status.name === "Завершено"
  );
  const rejectedRequests = requests.filter(
    (request) => request.status.name === "Отклонено"
  );

  useEffect(() => {
    setAllBooks(data);
  }, [data]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const reqs = await getRequests(user.id);
        setRequests(reqs);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  if (requests?.length > 0) {
    return (
      <div className="flex flex-col gap-14">
        {processRequests?.length > 0 && (
          <div>
            <h3 className="mb-10 font-bold text-2xl text-brown sm:text-3xl">
              На подтверждении
            </h3>
            <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
              {processRequests.map((request) => (
                <RequestCard key={request.id} request={request}/>
              ))}
            </div>
          </div>
        )}
        {activeRequests?.length > 0 && (
          <div>
            <h3 className="mb-10 font-bold text-2xl text-brown sm:text-3xl">
              Текущие заявки
            </h3>
            <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
              {activeRequests.map((request) => (
                <RequestCard key={request.id} request={request}/>
              ))}
            </div>
          </div>
        )}
        {rejectedRequests?.length > 0 && (
          <div>
            <h3 className="mb-10 font-bold text-2xl text-brown sm:text-3xl">
              Отклоненные заявки
            </h3>
            <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
              {rejectedRequests.map((request) => (
                <RequestCard key={request.id} request={request}/>
              ))}
            </div>
          </div>
        )}
        {finishRequests?.length > 0 && (
          <div>
            <h3 className="mb-10 font-bold text-2xl text-brown sm:text-3xl">
              История выполненных заявок
            </h3>
            <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
              {finishRequests.map((request) => (
                <RequestCard key={request.id} request={request}/>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <h3 className="mt-14 font-bold text-brown text-center text-xl">
        Вы еще не делали заявок
      </h3>
    )
  }
};
