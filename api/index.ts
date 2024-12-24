export { login } from "./user-api";
export { registrate } from "./user-api";

export { getBooks } from "./book-api";
export { getAllBooks } from "./book-api";
export { addBook } from "./book-api";
export { editBook } from "./book-api";
export { deleteBook } from "./book-api";

export { getAuthors } from "./author-api";
export { addAuthor } from "./author-api";
export { editAuthor } from "./author-api";
export { deleteAuthor } from "./author-api";

export { getGenres } from "./genre-api";
export { addGenre } from "./genre-api";
export { editGenre } from "./genre-api";
export { deleteGenre } from "./genre-api";

export { getRequests } from "./request-api";
export { getAllRequests } from "./request-api";
export { createRequest } from "./request-api";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
