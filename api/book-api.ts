import { apiUrl } from ".";

export const getBooks = async (search = "") => {
  try {
    if (apiUrl) {
      const res = await fetch(
        apiUrl + `/books?_expand=author&_expand=genre&title_like=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: false,
            tags: ["book"],
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed get books");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
