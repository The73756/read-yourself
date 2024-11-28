import { AddGenreForm } from "./add-genre-form";
import { CustomDialog } from "./custom-dialog";
import { DeleteGenreList } from "./delete-genre-list";
import { EditGenreList } from "./edit-genre-list";
import { Button } from "./ui/button";

export const AdminGenre = () => {
  return (
    <div className="flex flex-col gap-5 mx-auto max-w-[600px]">
      <CustomDialog
        trigger={<Button>Добавить</Button>}
        title="Добавление жанра"
      >
        <AddGenreForm />
      </CustomDialog>
      <CustomDialog
        trigger={<Button>Редактировать</Button>}
        title="Редактирование жанра"
      >
        <EditGenreList />
      </CustomDialog>
      <CustomDialog
        trigger={<Button variant="outline">Удалить</Button>}
        title="Удаление жанра"
      >
        <DeleteGenreList />
      </CustomDialog>
    </div>
  );
};
