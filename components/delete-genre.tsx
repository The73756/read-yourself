import { Button } from "@/components/ui/button";
import { DialogClose } from "./ui/dialog";

interface DeleteBookProps {
  author: { id: number; name: string };
}

export const DeleteGenre = ({ author }: DeleteBookProps) => {
  return (
    <>
      <p>Вы точно хотите удалить {author.name}?</p>
      <div className="flex gap-2 md:gap-5">
        <Button className="w-full">Удалить</Button>
        <DialogClose asChild>
          <Button className="w-full" variant="outline">
            Отмена
          </Button>
        </DialogClose>
      </div>
    </>
  );
};
