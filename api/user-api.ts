import { apiUrl } from ".";

interface loginProps {
  login: string;
  password: string;
}

interface regProps {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  login: string;
  password: string;
}

export const login = async ({ login, password }: loginProps) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + "/login", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: false,
          tags: ["user"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed login");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const registrate = async ({
  surname,
  name,
  patronymic,
  phone,
  email,
  password,
  login,
}: regProps) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + "/reg", {
        method: "POST",
        body: JSON.stringify({
          surname,
          name,
          patronymic,
          phone,
          email,
          password,
          login,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: false,
          tags: ["user"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed login");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
