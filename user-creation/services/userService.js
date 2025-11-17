import { createUser as createUserRepo } from "../repository/userRepository.js";

export const createUser = async (data) => {
  return await createUserRepo(data);
};
