import { NextFunction, Request, Response } from "express";
import usersModel from "../models/users.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // Auth data is mostly sent via authorization header.. so, checking it..

  if (!req.headers.authorization) throw "Authorization error!";

  // Authorization header is generally sent as {authorization:"Bearer auth_id"} so, splitting so we only get the auth code..
  const auth_id_from_request = req.headers.authorization.split(" ")[1];

  if (!auth_id_from_request) throw "Auth error. No auth id!";

  // Checking if user exists with that auth id...
  const getAuthUser = await usersModel.findOne({
    auth_id: auth_id_from_request,
  });

  if (!getAuthUser) throw "Authorization error!!";

  // If everything is good, moving forward!
  next();
};

export default auth;
