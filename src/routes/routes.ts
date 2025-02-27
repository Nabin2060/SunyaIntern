import { Request, Response, NextFunction } from "express";

const express = require("express");
const { register, login, logout } = require("../controller/authController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Example Protected Routes
router.get("/admin", protect, isAdmin, (req: Request, res: Response) => {
  res.json({ message: "Welcome, Admin!" });
});

router.get("/user", protect, (req: Request, res: Response) => {
  res.json({ message: "Welcome, User!" });
});

module.exports = router;
