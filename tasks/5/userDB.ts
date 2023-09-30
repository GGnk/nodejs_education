import type { IUser, TUsers } from "./types";

let users: TUsers = [
  {
    id: 1,
    name: "Ann",
    email: "ann@google.com",
    hobbies: ["books", "sport", "dancing"],
  },
  {
    id: 2,
    name: "Ben",
    email: "ben@google.com",
    hobbies: ["series", "sport"],
  },
];

export const getAllUsers = () => {
  return users.map(({ id, name, email }) => ({
    id,
    name,
    email,
  }));
};

export const getUserById = (id: number) => {
  const user = users.find((user) => user.id == id);
  if (!user) throw new Error("User not founded");
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const updateUser = (
  id: number,
  { name, email }: Pick<IUser, "name" | "email">
) => {
  let userWasUpdated = false;
  users.forEach((user) => {
    if (user.id === +id) {
      name ? (user.name = name) : null;
      email ? (user.email = email) : null;
      userWasUpdated = true;
    }
  });

  if (!userWasUpdated) {
    throw new Error("User not founded");
  }
};

export const createUser = ({
  name,
  email,
  hobbies = [],
}: Pick<IUser, "name" | "email" | "hobbies">) => {
  const isEmailUsed = users.find((user) => user.email === email);
  if (isEmailUsed) throw new Error("This email already used");
  const id = users.length + 1;

  users.push({
    id,
    name,
    email,
    hobbies,
  });
};

export const deleteUserById = (id: number) => {
  let isUserDeleted = false;
  users = users.filter((user) => {
    if (user.id !== id) {
      isUserDeleted = true;
      return true;
    } else {
      return false;
    }
  });

  if (!isUserDeleted) {
    throw new Error("User not founded");
  }
};

export const getUsersHobbies = (id: number) => {
  const user = users.find((user) => user.id == id);
  if (!user) throw new Error("User not founded");

  return { hobbies: user.hobbies };
};

export const addUsersHobby = (id: number, hobbiesToAdd: IUser["hobbies"]) => {
  let hobbyWasAdded = false;
  users = users.map((user) => {
    if (user.id === +id) {
      user.hobbies = [...user.hobbies, ...hobbiesToAdd];
      hobbyWasAdded = true;
    }
    return user;
  });

  if (!hobbyWasAdded) {
    throw new Error("Hobby was not added");
  }
};

export const deleteUsersHobby = (
  id: number,
  hobbiesToDelete: IUser["hobbies"]
) => {
  let hobbyWasDeleted = false;
  users = users.map((user) => {
    if (user.id === +id) {
      user.hobbies = user.hobbies.filter(
        (hobby) => !hobbiesToDelete.includes(hobby)
      );
      hobbyWasDeleted = true;
    }
    return user;
  });

  if (!hobbyWasDeleted) {
    throw new Error("Hobby was not deleted");
  }
};
