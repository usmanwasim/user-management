import api from "../api/axios";

export const getUsers = async (page, email, order, signal) => {
  const response = await api.get("/users", {
    params: {
      page,
      limit: 20,
      email,
      order,
    },
    signal,
  });

  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await api.patch(`/users/${id}/toggle`);
  return response.data;
};
