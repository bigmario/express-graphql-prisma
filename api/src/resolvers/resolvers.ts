import {
  allUsers,
  user,
  addUser,
  updateUser,
  deleteUser
} from "../modules/users/user.resolver";

export const resolvers = {
  Query: {
    allUsers,
    user
  },
  Mutation: {
     addUser,
     updateUser,
     deleteUser
  }
};
