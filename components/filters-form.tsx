import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "./ui/button";

export const FiltersForm = () => {
  const genres = [
    { id: 1, name: "xfgf" },
    { id: 2, name: "dfhdfb" },
    { id: 3, name: "xsdfgsfgf" },
    { id: 4, name: "xfxcvxcvgf" },
    { id: 5, name: "xfgsdfsf" },
  ];

  return (
    <>
      <div>
        <h3 className="mb-5 font-bold text-brown text-lg">Жанры</h3>
        <ToggleGroup type="multiple">
          {genres.map((genre) => (
            <ToggleGroupItem key={genre.id} value={genre.name}>
              {genre.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div>
        <h3 className="mb-5 font-bold text-brown text-lg">Жанры</h3>
        <ToggleGroup type="multiple">
          {genres.map((genre) => (
            <ToggleGroupItem key={genre.id} value={genre.name}>
              {genre.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Button className="w-full">Найти</Button>
    </>
  );
};
