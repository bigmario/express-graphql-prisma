import {
  getAllUsers,
  getOneuser,
  addUser,
  updateUser,
  deleteUser
} from "./modules/users/user.resolver";

export const resolvers = {
  Query: {
    allUsers: getAllUsers,
    user: getOneuser
  },
  Mutation: {
     addUser,
     updateUser,
     deleteUser
  }
};
