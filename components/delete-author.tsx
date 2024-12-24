import { Button } from "@/components/ui/button";
import { DialogClose } from "./ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { useAuthorStore } from "@/store/author-store";
import { useToast } from "@/hooks/use-toast";
import { deleteAuthor } from "@/api";

interface DeleteAuthorProps {
  author: { id: number; name: string };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteAuthor = ({ author, setOpen }: DeleteAuthorProps) => {
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const authors = useAuthorStore((state) => state.authors);
  const { toast } = useToast();

  async function onSubmit() {
    try {
      const deletedBook = await deleteAuthor(author.id);
      if (deletedBook) {
        setAuthors(authors.filter((a) => a.id !== author.id));
        setOpen(false);
        toast({
          title: "Автор успешно удален",
        });
      } else {
        toast({
          title: "Ошибка удаления",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <p>Вы точно хотите удалить {author.name}?</p>
      <div className="flex gap-2 md:gap-5">
        <Button onClick={onSubmit} className="w-full">
          Удалить
        </Button>
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      </div>
    </>
  );
};
