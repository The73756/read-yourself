"use client";
import {useRequestStore} from "@/store/request-store";
import {AdminRequestCard} from "@/components/admin-request-card";
import {useEffect, useState} from "react";
import {Request} from '@/types/request'

export const AdminRequest = () => {
  const allRequests = useRequestStore((state) => state.allRequests);
  const [adminRequests, setAdminRequests] = useState<Request[]>([])

  useEffect(() => {
    setAdminRequests(allRequests.filter(req => req.status.name === "В обработке" || req.status.name === "Принято"))
  }, [allRequests])

  return (
    <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
      {adminRequests.map((request) => (
        <AdminRequestCard key={request.id} request={request}/>
      ))}
    </div>
  );
};
