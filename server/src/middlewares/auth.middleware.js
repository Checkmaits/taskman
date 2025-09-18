import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

async function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return next({
      status: 401,
      message: "Invalid access token provided ❌",
    });
  }

  try {
    const id = (await jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET)).id;
    const user = await UserModel.findById(id).exec();
    if (!user) {
      return next({
        status: 401,
        message: "The user associated with this access token no longer exists ❌",
      });
    }

    req.user = user;
    next();
  } catch (_) {
    return next({
      status: 401,
      message: "Invalid access token provided ❌",
    });
  }
}

export default authMiddleware;
