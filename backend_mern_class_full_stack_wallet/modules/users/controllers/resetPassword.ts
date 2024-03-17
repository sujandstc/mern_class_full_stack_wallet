import { Request, Response } from "express";
import usersModel from "../../../models/users.model";
import bcrypt from "bcrypt";

const resetPassword = async (req: Request, res: Response) => {
  // Getting data from req.body.
  const { email, otp, new_password, confirm_password } = req.body;

  // General validations...
  if (!email) throw "Email is required!";
  if (!otp) throw "OTP is required!";
  if (!new_password) throw "Password is required";
  if (new_password != confirm_password) throw "Confirm password donot match!";

  const getUserWithTokenAndEmail = await usersModel
    .findOne({
      email,
      reset_password_token: otp,
    })
    .select("+reset_password_token");

  if (!getUserWithTokenAndEmail) throw "OTP doesnot match!";

  let encryptedPassword = await bcrypt.hash(new_password, 8);

  await usersModel.updateOne(
    {
      email,
      reset_password_token: otp,
    },
    {
      password: encryptedPassword,
      reset_password_token: "",
    }
  );

  // Send otp to user on email..

  // Options: AWS SES, SendGrid, MailChimp, NodeMailer (Gmail, yahoo, hotmail) [Not recommended], MailTrap, EmailJS

  res.status(200).json({
    status: "success",
    message: "Password has been reset!",
  });
};

export default resetPassword;
