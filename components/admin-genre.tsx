"use client";
import { useState } from "react";
import { AddGenreForm } from "./add-genre-form";
import { CustomDialog } from "./custom-dialog";
import { DeleteGenreList } from "./delete-genre-list";
import { EditGenreList } from "./edit-genre-list";
import { Button } from "./ui/button";

export const AdminGenre = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 mx-auto max-w-[600px]">
      <CustomDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        trigger={<Button>Добавить</Button>}
        title="Добавление жанра"
      >
        <AddGenreForm setOpen={setAddOpen} />
      </CustomDialog>
      <CustomDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        trigger={<Button>Редактировать</Button>}
        title="Редактирование жанра"
      >
        <EditGenreList setOpen={setEditOpen} />
      </CustomDialog>
      <CustomDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        trigger={<Button variant="outline">Удалить</Button>}
        title="Удаление жанра"
      >
        <DeleteGenreList setOpen={setDeleteOpen} />
      </CustomDialog>
    </div>
  );
};
