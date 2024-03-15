import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

const forgotPassword = async (req: Request, res: Response) => {
  // Getting data from req.body.
  const { email } = req.body;

  // General validations...
  if (!email) throw "Email is required!";

  const getEmail = await usersModel.findOne({
    email,
  });

  if (!getEmail) throw "This user doesnot exist!";

  await usersModel.updateOne(
    {
      email,
    },
    {
      reset_password_token: "00001",
    }
  );

  // User email address ma pathaune..

  res.status(200).json({
    status: "success",
    message: "OTP sent to email!",
  });
};

export default forgotPassword;
