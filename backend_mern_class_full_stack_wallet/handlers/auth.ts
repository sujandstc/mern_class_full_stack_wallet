import { NextFunction, Request, Response } from "express";
import usersModel from "../models/users.model";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // Auth data is mostly sent via authorization header.. so, checking it..

  if (!req.headers.authorization) throw "Authorization error!";

  // Authorization header is generally sent as {authorization:"Bearer auth_id"} so, splitting so we only get the auth code..
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) throw "Auth error. No accessToken!";

  // Veryify jwt
  try {
    const jwtVerify = jwt.verify(accessToken, process.env!.jwt_secret!);
    req.user = jwtVerify;
  } catch (e) {
    throw "Authorization error! JWT mismatch!";
  }

  // If everything is good, moving forward!
  next();
};

export default auth;
