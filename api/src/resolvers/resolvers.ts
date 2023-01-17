import {
  allUsers,
  user,
  addUser,
  updateUser,
  deleteUser
} from "../modules/users/user.resolver";

import { login, sendRecovery, changePassword } from "../modules/auth/auth.resolver";

export const resolvers = {
  Query: {
    allUsers,
    user
  },
  Mutation: {
     addUser,
     updateUser,
     deleteUser,
     login,
     sendRecovery,
     changePassword
  }
};
