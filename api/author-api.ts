import {AuthorGenre} from "@/types/author-genre";
import {apiUrl} from ".";

export const getAuthors = async () => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + `/authors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
          tags: ["author"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed get authors");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addAuthor = async (author: { name: string }) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + `/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
        next: {
          revalidate: 0,
          tags: ["author"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed create author");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const editAuthor = async (author: AuthorGenre) => {
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/authors/${author.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
        next: {
          revalidate: 0,
          tags: ["author"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed edit author");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteAuthor = async (id: number) => {
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/authors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
          tags: ["author"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed delete author");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
