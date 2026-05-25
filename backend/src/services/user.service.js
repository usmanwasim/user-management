import { pool } from "../config/db.js";
import {
  GET_USERS,
  GET_TOTAL_USERS,
  TOGGLE_USER_STATUS,
} from "../queries/user.query.js";

export const getUsersService = async ({ page, limit, email, order }) => {
  const offset = (page - 1) * limit;

  const GET_USERS_QUERY = GET_USERS(order);
  const users = await pool.query(GET_USERS_QUERY, [
    `%${email}%`,
    limit,
    offset,
  ]);

  const total = await pool.query(GET_TOTAL_USERS, [`%${email}%`]);

  return {
    users: users.rows,
    total: Number(total.rows[0].count),
  };
};

export const toggleUserStatusService = async (id) => {
  const result = await pool.query(TOGGLE_USER_STATUS, [id]);
  return result.rows[0];
};
