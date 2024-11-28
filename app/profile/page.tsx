import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { UserRequestList } from "@/components/user-request-list";
import {CustomDialog} from "@/components/custom-dialog";
import {CreateRequestForm} from "@/components/create-request-form";
import {getBooks} from "@/api";
import {Book} from "@/types/book";

export default async function Profile() {
  const books = await getBooks() as Book[]

  return (
    <div className="h-full container">
      <UserInfo />
      <CustomDialog
        trigger={
          <Button className="my-12 max-sm:w-full">Создать заявку</Button>
        }
        title="Заявка на бронь книг"
      >
        <CreateRequestForm books={books} />
      </CustomDialog>
      <UserRequestList />
    </div>
  );
}
