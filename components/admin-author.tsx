"use client";
import { useState } from "react";
import { AddAuthorForm } from "./add-author-form";
import { CustomDialog } from "./custom-dialog";
import { DeleteAuthorList } from "./delete-author-list";
import { EditAuthorList } from "./edit-author-list";
import { Button } from "./ui/button";

export const AdminAuthor = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 mx-auto max-w-[600px]">
      <CustomDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        trigger={<Button>Добавить</Button>}
        title="Добавление автора"
      >
        <AddAuthorForm setOpen={setAddOpen} />
      </CustomDialog>
      <CustomDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        trigger={<Button>Редактировать</Button>}
        title="Редактирование автора"
      >
        <EditAuthorList setOpen={setEditOpen} />
      </CustomDialog>
      <CustomDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        trigger={<Button variant="outline">Удалить</Button>}
        title="Удаление автора"
      >
        <DeleteAuthorList setOpen={setDeleteOpen} />
      </CustomDialog>
    </div>
  );
};
