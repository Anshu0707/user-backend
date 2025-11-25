import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repository/authRepository.js";

export async function registerUser(userId, email, password) {
  // 1. Check if user already exists in auth table
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert into auth_users table using same userId
  return await createUser(userId, email, hashedPassword);
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  return user;
}
