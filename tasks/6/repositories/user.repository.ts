import { UserEntity } from "../entities/user.entity";

export function ifUserExists(id: string): boolean {
  // @ts-ignore Next tasks
  return USERS_DB.some((user) => user.id === id);
}
