import { AddAuthorForm } from "./add-author-form";
import { CustomDialog } from "./custom-dialog";
import { DeleteAuthorList } from "./delete-author-list";
import { EditAuthorList } from "./edit-author-list";
import { Button } from "./ui/button";

export const AdminAuthor = () => {
  return (
    <div className="flex flex-col gap-5 mx-auto max-w-[600px]">
      <CustomDialog
        trigger={<Button>Добавить</Button>}
        title="Добавление автора"
      >
        <AddAuthorForm />
      </CustomDialog>
      <CustomDialog
        trigger={<Button>Редактировать</Button>}
        title="Редактирование автора"
      >
        <EditAuthorList />
      </CustomDialog>
      <CustomDialog
        trigger={<Button variant="outline">Удалить</Button>}
        title="Удаление автора"
      >
        <DeleteAuthorList />
      </CustomDialog>
    </div>
  );
};
