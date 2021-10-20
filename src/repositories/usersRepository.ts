import { EntityRepository, Repository } from "typeorm";
import { user } from "../models/user";

@EntityRepository(user)
class usersRepository extends Repository<user> {

}

export { usersRepository }