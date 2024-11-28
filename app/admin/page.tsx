import { AdminAuthor } from "@/components/admin-author";
import { AdminBook } from "@/components/admin-book";
import { AdminCheck } from "@/components/admin-check";
import { AdminGenre } from "@/components/admin-genre";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  return (
    <AdminCheck>
      <div className="h-full container">
        <Tabs defaultValue="book" className="flex flex-col items-center w-full">
          <TabsList className="mb-12 sm:mb-36">
            <TabsTrigger value="book">Книги</TabsTrigger>
            <TabsTrigger value="author">Авторы</TabsTrigger>
            <TabsTrigger value="genre">Жанры</TabsTrigger>
            {/* <TabsTrigger value="request">Заявки</TabsTrigger> */}
          </TabsList>
          <TabsContent value="book">
            <AdminBook />
          </TabsContent>
          <TabsContent value="author">
            <AdminAuthor />
          </TabsContent>
          <TabsContent value="genre">
            <AdminGenre />
          </TabsContent>
          {/* <TabsContent value="request">...</TabsContent> */}
        </Tabs>
      </div>
    </AdminCheck>
  );
}
