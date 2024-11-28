import { getBooks } from "@/api";
import { BookList } from "@/components/book-list";
import { Filters } from "@/components/filters";
import { Book } from "@/types/book";

export default async function Home() {
  const books = (await getBooks()) as Book[];

  return (
    <div className="mb-8 h-full container">
      <Filters />
      <BookList data={books} />
    </div>
  );
}
