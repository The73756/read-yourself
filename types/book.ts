export interface Book {
  id: number;
  title: string;
  author: { id: number; name: string };
  desc: string;
  image: string;
  year: number;
  genre: { id: number; name: string };
}
