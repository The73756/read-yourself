import { getAllBooks, getAuthors, getBooks, getGenres } from "@/api";
import { AuthCheck } from "@/components/auth-check";
import { BookList } from "@/components/book-list";
import { BookPagination } from "@/components/book-pagination";
import { Filters } from "@/components/filters";
import { Header } from "@/components/header";
import { AuthorGenre } from "@/types/author-genre";
import { Book, GetBooksResponse } from "@/types/book";
import { Footer } from "@/components/footer";

export default async function Home() {
  const { books, totalCount } = (await getBooks()) as GetBooksResponse;
  const allBooks = (await getAllBooks()) as Book[];
  const authors = (await getAuthors()) as AuthorGenre[];
  const genres = (await getGenres()) as AuthorGenre[];

  return (
    <AuthCheck>
      <>
        <Header />
        <div className="mb-8 h-full container">
          <Filters data={{ authors, genres }} />
          <div className="flex flex-col gap-14 mt-16">
            <BookList data={{ books, allBooks }} />
            <BookPagination count={totalCount} />
          </div>
        </div>
        <Footer />
      </>
    </AuthCheck>
  );
}
