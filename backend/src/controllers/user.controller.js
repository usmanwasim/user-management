import {
  getUsersService,
  toggleUserStatusService,
} from "../services/user.service.js";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getUsers = async (req, res) => {
  try {
    const page = clamp(Number(req.query.page) || 1, 1, Infinity);
    const limit = clamp(Number(req.query.limit) || 20, 1, 100);
    const email = (req.query.email || "").trim();
    const order = req.query.order === "DESC" ? "DESC" : "ASC";

    const data = await getUsersService({ page, limit, email, order });

    res.status(200).json(data);
  } catch (err) {
    console.error("[error]", err);
    res.status(500).json({ message: "Error occurred while fetching users" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const user = await toggleUserStatusService(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("[error]", err);
    res
      .status(500)
      .json({ message: "Error occurred while toggling user status" });
  }
};
