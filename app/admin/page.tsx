import {getAllBooks, getAllRequests, getAuthors, getGenres} from "@/api";
import {AdminCheck} from "@/components/admin-check";
import {AdminTabs} from "@/components/admin-tabs";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {AuthorGenre} from "@/types/author-genre";
import {Book} from "@/types/book";
import {Request} from "@/types/request";
import {getAllUsers} from "@/api/user-api";
import {User} from "@/types/user";

export default async function Admin() {
  const allBooks = (await getAllBooks()) as Book[];
  const authors = (await getAuthors()) as AuthorGenre[];
  const genres = (await getGenres()) as AuthorGenre[];
  const allRequests = (await getAllRequests()) as Request[];
  const allUsers = (await getAllUsers()) as User[];

  return (
    <AdminCheck>
      <>
        <Header/>
        <AdminTabs data={{allBooks, authors, genres, allRequests, allUsers}}/>
        <Footer/>
      </>
    </AdminCheck>
  );
}
