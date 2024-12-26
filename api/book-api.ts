import {apiUrl} from ".";

export const getBooks = async (
  search = "",
  page = 1,
  sort = "title",
  order = "asc",
  authorId = "",
  genreId = ""
) => {
  try {
    if (apiUrl) {
      const res = await fetch(
        apiUrl +
        `/books?_expand=author&_expand=genre&title_like=${search}${
          authorId && `&authorId=${authorId}`
        }${
          genreId && `&genreId=${genreId}`
        }&_page=${page}&_limit=6&_sort=${sort}&_order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 0,
            tags: ["book"],
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed get books");
      }

      const books = await res.json();

      return {
        books: books || {},
        totalCount: Number(res.headers.get("x-total-count")),
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllBooks = async () => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + "/books?_expand=author&_expand=genre", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
          tags: ["book"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed get books");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addBook = async (book: {
  title: string;
  authorId: number;
  genreId: number;
  image: string;
  year: number;
  desc: string;
}) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + "/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
        next: {
          revalidate: 0,
          tags: ["book"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed create book");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const editBook = async (book: {
  id: number;
  title: string;
  authorId: number;
  genreId: number;
  image: string;
  year: number;
  desc: string;
}) => {
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
        next: {
          revalidate: 0,
          tags: ["book"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed edit book");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteBook = async (id: number) => {
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
          tags: ["book"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed delete book");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
