import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Trust proxy for accurate client IP detection (required for rate limiting)
app.set("trust proxy", 1);

app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/users", userRoutes);

// Serve Vite build
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

export default app;
