import type { IUser, Request, Response } from "./types";
import * as db from "./userDB";
import url from "url";

export const getId = (req: Request) => {
  const parsedUrl = url.parse(req.url || "", true);
  return +(parsedUrl.query.id as string);
};
export const successOperation = (
  res: Response,
  statusCode: number,
  data?: Partial<IUser> | Partial<IUser>[]
) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(data ? JSON.stringify({ data }) : "Success!");
};
export const getAllUsers = (_req: Request, res: Response) => {
  const data = db.getAllUsers();
  successOperation(res, 200, data);
};

export const getUser = (req: Request, res: Response) => {
  const id = getId(req);
  const data = db.getUserById(id);
  successOperation(res, 200, data);
};

export const updateUser = (req: Request, res: Response) => {
  const id = getId(req);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { name, email } = JSON.parse(body);
    db.updateUser(id, { name, email });
    successOperation(res, 200);
  });
};

export const createUser = (req: Request, res: Response) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { name, email, hobbies } = JSON.parse(body);
    if (!name || !email) throw new Error("Provided data is incorrect");
    db.createUser({ name, email, hobbies });
    successOperation(res, 201);
  });
};

export const addUsersHobby = (req: Request, res: Response) => {
  const id = getId(req);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { hobbies } = JSON.parse(body);
    if (!hobbies) throw new Error("Provided data is incorrect");
    db.addUsersHobby(id, hobbies);
    successOperation(res, 200);
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const id = getId(req);
  db.deleteUserById(id);
  successOperation(res, 204);
};

export const deleteUserHobbies = (req: Request, res: Response) => {
  const id = getId(req);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const { hobbies } = JSON.parse(body);
    if (!hobbies) throw new Error("Provided data is incorrect");
    db.deleteUsersHobby(id, hobbies);
    successOperation(res, 204);
  });
};

export const getUserHobbies = (req: Request, res: Response) => {
  const id = getId(req);
  const data = db.getUsersHobbies(id);
  res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
  res.setHeader("Expires", new Date(Date.now() + 3600000).toUTCString()); // Expires in 1 hour

  successOperation(res, 200, data);
};
