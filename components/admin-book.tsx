import { AddBookForm } from "./add-book-form";
import { CustomDialog } from "./custom-dialog";
import { DeleteBookList } from "./delete-book-list";
import { EditBookList } from "./edit-book-list";
import { Button } from "./ui/button";

export const AdminBook = () => {
  return (
    <div className="flex flex-col gap-5 mx-auto max-w-[600px]">
      <CustomDialog
        trigger={<Button>Добавить</Button>}
        title="Добавление книги"
      >
        <AddBookForm />
      </CustomDialog>
      <CustomDialog
        trigger={<Button>Редактировать</Button>}
        title="Редактирование книги"
      >
        <EditBookList />
      </CustomDialog>
      <CustomDialog
        trigger={<Button variant="outline">Удалить</Button>}
        title="Удаление книги"
      >
        <DeleteBookList />
      </CustomDialog>
    </div>
  );
};
