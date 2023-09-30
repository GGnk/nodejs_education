import http from "http";
import url from "url";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getUserHobbies,
  addUsersHobby,
  deleteUserHobbies,
} from "./controllers";
import type { HTTP_METHODS, Routes } from "./types";

const routes: Routes = {
  "/users": {
    GET: getAllUsers,
    POST: createUser,
    links: [
      { rel: "self", href: `/users` },
      { rel: "create-user", href: "/users", method: "POST" },
    ],
  },
  "/user": {
    GET: getUser,
    POST: updateUser,
    DELETE: deleteUser,
    links: [
      { rel: "self", href: `/user` },
      { rel: "update-user", href: "/user", method: "POST" },
      { rel: "delete-user", href: "/user", method: "DELETE" },
    ],
  },
  "/user-hobbies": {
    GET: getUserHobbies,
    POST: addUsersHobby,
    links: [
      { rel: "self", href: `/user-hobbies` },
      { rel: "add-user-hobbies", href: "/user-hobbies", method: "POST" },
    ],
  },
  "/remove-hobby": {
    POST: deleteUserHobbies,
  },
};
const findRouteHandler = (
  routes: Routes,
  url: string | null,
  method?: HTTP_METHODS
) => {
  if (url && method) {
    console.log("findRouteHandler", { url, method });
    const route = routes[url];
    return route[method];
  }
  return null;
};
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || "", true);
  const pathname = parsedUrl.pathname;
  const routeHandler = findRouteHandler(
    routes,
    pathname,
    req.method as HTTP_METHODS
  );

  if (!routeHandler) {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  }

  try {
    routeHandler(req, res);
  } catch (error) {
    res.statusCode = 500;
    res.end("Server error");
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server is running on " + PORT + " port");
});
