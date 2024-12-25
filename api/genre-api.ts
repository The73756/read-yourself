import {AuthorGenre} from "@/types/author-genre";
import {apiUrl} from ".";

export const getGenres = async () => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + `/genres`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
          tags: ["genre"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed get genres");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addGenre = async (genre: { name: string }) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + `/genres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(genre),
        next: {
          revalidate: false,
          tags: ["genre"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed create genre");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const editGenre = async (genre: AuthorGenre) => {
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/genres/${genre.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(genre),
        next: {
          revalidate: false,
          tags: ["genre"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed edit genre");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteGenre = async (id: number) => {
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/genres/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: false,
          tags: ["genre"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed delete genre");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
