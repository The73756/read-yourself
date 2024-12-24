import { Request } from "@/types/request";
import { create } from "zustand";

interface RequestState {
  requests: Request[];
  requestBooks: Request[];
  allRequests: Request[];
  setRequests: (requests: Request[]) => void;
  setRequestBooks: (requestBooks: Request[]) => void;
  setAllRequests: (requests: Request[]) => void;
}

export const useRequestStore = create<RequestState>()((set) => ({
  requests: [],
  requestBooks: [],
  allRequests: [],
  setRequests: (requests) => set({ requests: requests }),
  setRequestBooks: (requestBooks) => set({ requestBooks: requestBooks }),
  setAllRequests: (requests) => set({ allRequests: requests }),
}));
