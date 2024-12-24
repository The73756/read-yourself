"use client";
import { useRequestStore } from "@/store/request-store";
import { RequestCard } from "./request-card";

export const AdminRequest = () => {
  const allRequests = useRequestStore((state) => state.allRequests);

  return (
    <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
      {allRequests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};
