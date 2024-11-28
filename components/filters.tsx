"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "./shared/arrow-down-icon";
import { CustomDialog } from "./custom-dialog";
import { FiltersForm } from "./filters-form";
import { getBooks } from "@/api";
import { useBookStore } from "@/store/book-store";

export const Filters = () => {
  const [sort, setSort] = useState("alphabet");
  const setBooks = useBookStore((state) => state.setBooks);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchBooks = await getBooks(e.target.value);
    setBooks(searchBooks);
  };

  return (
    <div className="flex max-sm:flex-wrap justify-between items-center gap-4">
      <Input
        className="w-full sm:w-[calc(50%-32px)]"
        placeholder="Поиск..."
        onChange={(e) => handleSearch(e)}
      />
      <div className="flex items-center gap-8">
        <CustomDialog
          trigger={
            <Button size="sm" variant="ghost">
              Фильтры
            </Button>
          }
          title="Фильтры"
        >
          <FiltersForm />
        </CustomDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              Сортировка
              <ArrowDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-max">
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="alphabet">
                По алфавиту
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="year">
                По году издания
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
