import { Button } from "@/components/ui/button";
import { DialogClose } from "./ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGenreStore } from "@/store/genre-store";
import { deleteGenre } from "@/api";

interface DeleteGenreProps {
  genre: { id: number; name: string };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteGenre = ({ genre, setOpen }: DeleteGenreProps) => {
  const setGenres = useGenreStore((state) => state.setGenres);
  const genres = useGenreStore((state) => state.genres);
  const { toast } = useToast();

  async function onSubmit() {
    try {
      const deletedBook = await deleteGenre(genre.id);
      if (deletedBook) {
        setGenres(genres.filter((g) => g.id !== genre.id));
        setOpen(false);
        toast({
          title: "Жанр успешно удален",
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
      <p>Вы точно хотите удалить {genre.name}?</p>
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
