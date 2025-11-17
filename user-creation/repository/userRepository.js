import { pool } from "../config/db.js";

export const createUser = async ({ name, email }) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, email];
  const result = await pool.query(query, values);

  return result.rows[0];
};
