"use client";
import { AddBookForm } from "./add-book-form";
import { CustomDialog } from "./custom-dialog";
import { DeleteBookList } from "./delete-book-list";
import { EditBookList } from "./edit-book-list";
import { Button } from "./ui/button";
import { useState } from "react";

export const AdminBook = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 mx-auto max-w-[600px]">
      <CustomDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        trigger={<Button>Добавить</Button>}
        title="Добавление книги"
      >
        <AddBookForm setOpen={setAddOpen} />
      </CustomDialog>
      <CustomDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        trigger={<Button>Редактировать</Button>}
        title="Редактирование книги"
      >
        <EditBookList setOpen={setEditOpen} />
      </CustomDialog>
      <CustomDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        trigger={<Button variant="outline">Удалить</Button>}
        title="Удаление книги"
      >
        <DeleteBookList setOpen={setDeleteOpen} />
      </CustomDialog>
    </div>
  );
};
