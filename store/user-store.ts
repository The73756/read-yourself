import {User} from "@/types/user";
import {create} from "zustand";

interface UserState {
  user: User;
  isAuth: boolean;
  allUsers: User[];
  setUser: (user: User) => void;
  setIsAuth: (isAuth: boolean) => void;
  setAllUsers: (users: User[]) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: {} as User,
  isAuth: false,
  allUsers: [],
  setUser: (user) => {
    set({user: user});
    localStorage.setItem("user", JSON.stringify(user));
  },
  setIsAuth: (isAuth) => set({isAuth: isAuth}),
  setAllUsers: (users) => set({allUsers: users}),
}));