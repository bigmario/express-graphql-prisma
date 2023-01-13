import {
  allUsers,
  addUser,
  user
} from "./modules/users/user.resolver";

export const resolvers = {
  Query: {
    allUsers,
    user
  },
  Mutation: {
     addUser,
  }
};
