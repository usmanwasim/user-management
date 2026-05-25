export const GET_USERS = (order) => {
  return `
SELECT * FROM users
WHERE email ILIKE $1
ORDER BY age ${order}
LIMIT $2 OFFSET $3
`;
};

export const GET_TOTAL_USERS = `
SELECT COUNT(*) FROM users
WHERE email ILIKE $1
`;

export const TOGGLE_USER_STATUS = `
UPDATE users
SET is_active = NOT is_active
WHERE id = $1
RETURNING *
`;
