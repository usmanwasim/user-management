import {
  getUsersService,
  toggleUserStatusService,
} from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const email = req.query.email || "";
    const order = req.query.order || "ASC";

    const data = await getUsersService({ page, limit, email, order });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await toggleUserStatusService(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
