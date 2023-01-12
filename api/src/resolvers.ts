import {
  allUsers,
  addUser,
  user
} from "./modules/users/resolvers/user.resolver";

export const resolvers = {
  Query: {
    allUsers,
    user
  },
  Mutation: {
     addUser,
  }
};
