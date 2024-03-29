import bcrypt from "bcrypt";
import { Request, Response } from "express";
import usersModel from "../../../models/users.model";
import jwt from "jsonwebtoken";
import JwtCreator from "../../../handlers/jwtCreator";

const usersLogin = async (req: Request, res: Response) => {
  // Getting data from req.body.
  const { email, password } = req.body;

  // General validations...
  if (!email) throw "Email is required!";
  if (!password) throw "Password is required";

  // Get user that matches email provided by user...

  const getUser = await usersModel
    .findOne({
      email: email,
    })
    .select("+password");

  if (!getUser) throw "This user doesnot exist!";

  // If everything is good, move forward!

  // Compare password!
  let comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Password donot match!";

  // await usersModel.updateOne({ email: email }, { auth_id: uniqueId });

  const accessToken = JwtCreator(getUser._id.toString());

  res.status(200).json({
    status: "success",
    message: "Logged in successfully!",
    accessToken,
  });
};

export default usersLogin;
