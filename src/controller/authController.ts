import { Request, Response } from "express";
const { AppDataSource } = require("../data-source");
const { User } = require("../entity/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const { genHash, compareHash } = require("../utils/hashPasword");

const userRepository = AppDataSource.getRepository(User);

// User Registration
const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await genHash;
  const newUser = userRepository.create({
    email,
    password: hashedPassword,
    role
  });

  await userRepository.save(newUser);
  res.status(201).json({ message: "User registered successfully" });
};

// User Login
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await compareHash;
  if (!isMatch)
    return res
      .status(400)
      .json({ message: "Invalid credentials.Please valid email or password." });

  const token = generateToken(user.id, user.role);
  res.json({ message: "Login successful", token });
};

// Logout User
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.SECURE === "production",
    sameSite: "strict"
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
module.exports = { register, login, logout };
