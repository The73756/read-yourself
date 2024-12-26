import {Book} from "@/types/book";
import {apiUrl} from ".";

export const getRequests = async (userId: number) => {
  try {
    if (apiUrl) {
      const res = await fetch(
        apiUrl +
        `/requests?_embed=requestBooks&_expand=status&userId=${userId}&_sort=createDate&_order=desc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 0,
            tags: ["request"],
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed get requests");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllRequests = async () => {
  try {
    if (apiUrl) {
      const res = await fetch(
        apiUrl +
        `/requests?_embed=requestBooks&_expand=status&_sort=createDate&_order=desc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 0,
            tags: ["request"],
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed get requests");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const createRequest = async (
  userId: number,
  returnDate: string | Date,
  createDate: string | Date,
  books: Book[]
) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + "/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          returnDate,
          createDate,
          statusId: 1,
        }),
        next: {
          revalidate: 0,
          tags: ["request"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed create request");
      }

      const requestData = await res.json();

      const statusRes = await fetch(
        apiUrl + `/statuses/${requestData.statusId}`
      );
      if (!statusRes.ok) {
        throw new Error("Failed to fetch status");
      }
      const statusData = await statusRes.json();
      requestData.status = statusData;

      const requestBooks = await Promise.all(
        books.map(async (book) => {
          const res = await fetch(apiUrl + "/requestBooks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bookId: book.id,
              requestId: requestData.id,
            }),
            next: {
              revalidate: 0,
              tags: ["request"],
            },
          });
          return res.json();
        })
      );

      return {
        ...requestData,
        requestBooks,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateStatus = async (requestId: number, statusId: number) => {
  try {
    if (apiUrl) {
      const res = await fetch(
        apiUrl +
        `/requests/${requestId}`,
        {
          method: "PATCH",
          body: JSON.stringify({statusId}),
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: false,
            tags: ["request"],
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed update requests");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequest = async (requestId: number) => {
  try {
    if (apiUrl) {
      const res = await fetch(
        apiUrl +
        `/requests/${requestId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 0,
            tags: ["request"],
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed update requests");
      }

      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};