"use client";
import {AdminAuthor} from "@/components/admin-author";
import {AdminBook} from "@/components/admin-book";
import {AdminGenre} from "@/components/admin-genre";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useAuthorStore} from "@/store/author-store";
import {useBookStore} from "@/store/book-store";
import {useGenreStore} from "@/store/genre-store";
import {AuthorGenre} from "@/types/author-genre";
import {Book} from "@/types/book";
import {useEffect} from "react";
import {AdminRequest} from "./admin-request";
import {Request} from "@/types/request";
import {useRequestStore} from "@/store/request-store";
import {User} from "@/types/user";
import {useUserStore} from "@/store/user-store";

interface AdminTabsProps {
  data: {
    allBooks: Book[];
    authors: AuthorGenre[];
    genres: AuthorGenre[];
    allRequests: Request[];
    allUsers: User[];
  };
}

export const AdminTabs = ({data}: AdminTabsProps) => {
  const setAllBooks = useBookStore((state) => state.setAllBooks);
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const setGenres = useGenreStore((state) => state.setGenres);
  const setAllRequests = useRequestStore((state) => state.setAllRequests);
  const setAllUsers = useUserStore((state) => state.setAllUsers);
  const allUsers = useUserStore((state) => state.allUsers);

  useEffect(() => {
    setAllBooks(data.allBooks);
    setAuthors(data.authors);
    setGenres(data.genres);
    setAllRequests(data.allRequests);
    setAllUsers(data.allUsers);
  }, [data]);

  return (
    <div className="h-full container">
      <Tabs defaultValue="book" className="flex flex-col items-center w-full">
        <TabsList className="mb-12 sm:mb-36">
          <TabsTrigger value="book">Книги</TabsTrigger>
          <TabsTrigger value="author">Авторы</TabsTrigger>
          <TabsTrigger value="genre">Жанры</TabsTrigger>
          <TabsTrigger value="request">Заявки</TabsTrigger>
        </TabsList>
        <TabsContent value="book">
          <AdminBook/>
        </TabsContent>
        <TabsContent value="author">
          <AdminAuthor/>
        </TabsContent>
        <TabsContent value="genre">
          <AdminGenre/>
        </TabsContent>
        <TabsContent value="request">
          <AdminRequest/>
        </TabsContent>
      </Tabs>
    </div>
  );
};
