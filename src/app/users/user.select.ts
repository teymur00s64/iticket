import { User } from "src/database/entities/User.entity";
import { FindOptionsSelect } from "typeorm";

export const USER_BASIC_SELECT : FindOptionsSelect<User> = {
    id: true,
    userName: true,
    firstName: true,
    lastName: true
}

export const USER_PROFILE_SELECT: FindOptionsSelect<User> = {
    id: true,
    userName: true,
    firstName: true,
    lastName: true,
    birthDate: true,
  }