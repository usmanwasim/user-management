export const GET_USERS = (order) => {
  return `
SELECT id, name, email, age, is_active FROM users
WHERE email ILIKE $1
ORDER BY age ${order}, id ${order}
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
RETURNING id, name, email, age, is_active
`;
