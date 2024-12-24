import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { UserRequestList } from "@/components/user-request-list";
import { CustomDialog } from "@/components/custom-dialog";
import { CreateRequestForm } from "@/components/create-request-form";
import { Book } from "@/types/book";
import { getAllBooks } from "@/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthCheckWrapper } from "@/components/auth-check-wrapper";

export default async function Profile() {
  const allBooks = (await getAllBooks()) as Book[];

  return (
    <AuthCheckWrapper>
      <>
        <Header />
        <div className="h-full container">
          <UserInfo />
          <CustomDialog
            trigger={
              <Button className="my-12 max-sm:w-full">Создать заявку</Button>
            }
            title="Заявка на бронь книг"
          >
            <CreateRequestForm />
          </CustomDialog>
          <UserRequestList data={allBooks} />
        </div>
        <Footer />
      </>
    </AuthCheckWrapper>
  );
}
