import {apiUrl} from ".";

interface loginProps {
  login: string;
  password: string;
}

interface regProps {
  id?: number;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  login?: string;
  password: string;
}

export const login = async ({login, password}: loginProps) => {
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

export const editUser = async ({
                                 id,
                                 surname,
                                 name,
                                 patronymic,
                                 phone,
                                 email,
                                 password
                               }: regProps) => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl +
        `/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          surname,
          name,
          patronymic,
          phone,
          email,
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
        throw new Error("Failed edit");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async () => {
  try {
    if (apiUrl) {
      const res = await fetch(apiUrl + "/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: false,
          tags: ["user"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};