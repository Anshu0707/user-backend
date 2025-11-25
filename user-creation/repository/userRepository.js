import { pool } from "../config/db.js";

// Checking if the registered user email is same as existing user email. In this case registering user name should also match existing user name
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email]
  );
  return result.rows[0];
};

export const createUser = async ({ name, email }) => {
  // Check if email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    if (existingUser.name !== name) {
      throw new Error("Email already exists with a different name");
    }
    return existingUser;
  }
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, email];
  const result = await pool.query(query, values);

  return result.rows[0];
};
