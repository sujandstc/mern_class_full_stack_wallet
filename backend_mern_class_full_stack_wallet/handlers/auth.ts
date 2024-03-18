import { NextFunction, Request, Response } from "express";
import usersModel from "../models/users.model";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // Auth data is mostly sent via authorization header.. so, checking it..

  if (!req.headers.authorization) throw "Authorization error!";

  // Authorization header is generally sent as {authorization:"Bearer accessToken"} so, splitting so we only get the jwt string
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) throw "Auth error. No accessToken!";

  // Veryify jwt
  try {
    // If this fails, an error is thrown which will be caught by catch block...
    const jwtVerify = jwt.verify(accessToken, process.env!.jwt_secret!);
    // If this is successful, jwt verify will give the decoded payload... We then save that payload to req.user object
    // Hypothetically, id card has been kept on your neck..
    req.user = jwtVerify;
  } catch (e) {
    // We are using throw there to give an error that will later be caught by errorHandler..
    throw "Authorization error! JWT mismatch!";
  }

  // If everything is good, moving forward!
  next();
};

export default auth;
