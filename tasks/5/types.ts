import type { IncomingMessage, ServerResponse } from "http";

export interface Request extends IncomingMessage {}

export interface Response extends ServerResponse<IncomingMessage> {
  req: IncomingMessage;
}

type RouteHandler = (req: Request, res: Response) => void;

interface Link {
  rel: string;
  href: string;
  method?: string;
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}
interface RouteConfig {
  [HTTP_METHODS.GET]?: RouteHandler;
  [HTTP_METHODS.POST]?: RouteHandler;
  [HTTP_METHODS.DELETE]?: RouteHandler;
  ["links"]?: Link[];
}

export interface Routes {
  [path: string]: RouteConfig;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  hobbies: string[];
}
export type TUsers = IUser[];