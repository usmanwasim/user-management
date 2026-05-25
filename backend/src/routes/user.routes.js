import express from "express";
import { getUsers, toggleUserStatus } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.patch("/:id/toggle", toggleUserStatus);

export default router;
