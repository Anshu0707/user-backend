import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM auth_users WHERE email = $1 LIMIT 1",
    [email]
  );
  return result.rows[0];
}

export async function createUser(userId, email, hashedPassword) {
  const result = await pool.query(
    `INSERT INTO auth_users (id, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, email, hashedPassword]
  );
  return result.rows[0];
}
