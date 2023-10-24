import { EntityRepository } from "@mikro-orm/postgresql";
import { DI } from "../app";
import { UserEntity } from "../entities/user.entity";

export class UserRepository extends EntityRepository<UserEntity> {
  async ifUserExists(id: string) {
    const user = await DI.userRepository.findOne({ id });

    return !!user;
  }
}
