import UserModel from "../models/user.model.js";
import { processError } from "../utils/error.utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return next({
        status: 401,
        message: "Invalid email or password ❌",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next({
        status: 401,
        message: "Invalid email or password ❌",
      });
    }

    const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = await jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 * 7 });
    res.status(200).json({ message: `User signed in successfully ✅`, data: { access_token: accessToken } });
  } catch (_) {
    next({});
  }
}

export async function register(req, res, next) {
  try {
    const { email } = req.body;
    const foundUser = await UserModel.findOne({ email }).exec();
    if (foundUser) {
      return next({ status: 409, message: "A user with those credentials already exists ❌" });
    }

    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json({
      message: `User entry created successfully (ID: ${user.id}) ✅`,
    });
  } catch (error) {
    processError(error, next);
  }
}

export async function logout(req, res) {
  const cookies = req.cookies;
  if (!cookies.refresh_token) return res.sendStatus(204);
  res.clearCookie("refresh_token", { httpOnly: true, path: "/" });
  res.status(200).json({ message: "User logged out successfully ✅" });
}

export async function refresh(req, res, next) {
  const cookies = req.cookies;
  if (!cookies.refresh_token) {
    return next({
      status: 401,
      message: "Invalid refresh token provided ❌",
    });
  }

  try {
    const id = (await jwt.verify(cookies.refresh_token, process.env.JWT_REFRESH_SECRET)).id;
    const user = await UserModel.findById(id).exec();
    if (!user) {
      return next({
        status: 404,
        message: "The account associated with this refresh token no longer exists ❌",
      });
    }

    const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res
      .status(200)
      .json({ message: "User access token refreshed successfully ✅", data: { access_token: accessToken } });
  } catch (_) {
    next({
      status: 401,
      message: "Invalid refresh token provided ❌",
    });
  }
}
