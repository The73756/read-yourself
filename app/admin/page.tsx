import { getAllBooks, getAllRequests, getAuthors, getGenres } from "@/api";
import { AdminCheck } from "@/components/admin-check";
import { AdminTabs } from "@/components/admin-tabs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AuthorGenre } from "@/types/author-genre";
import { Book } from "@/types/book";
import { Request } from "@/types/request";

export default async function Admin() {
  const allBooks = (await getAllBooks()) as Book[];
  const authors = (await getAuthors()) as AuthorGenre[];
  const genres = (await getGenres()) as AuthorGenre[];
  const allRequests = (await getAllRequests()) as Request[];

  return (
    <AdminCheck>
      <>
        <Header />
        <AdminTabs data={{ allBooks, authors, genres, allRequests }} />
        <Footer />
      </>
    </AdminCheck>
  );
}
