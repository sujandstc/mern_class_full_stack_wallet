import { Request, Response } from "express";
import usersModel, { IUsersModel } from "../../../models/users.model";
import bcrypt from "bcrypt";

const usersRegister = async (req: Request, res: Response) => {
  // Getting data from req.body.
  const { email, password, confirm_password, name } = req.body;

  // General validations...
  if (!email) throw "Email is required!";
  if (!password) throw "Password is required";
  if (password != confirm_password)
    throw "Password and confirm password donot match!";
  if (!name) throw "Name is required!";
  if (name.length < 3) throw "Name must be at least 3 characters long!";

  // Database validation...

  const existingUser = await usersModel.findOne({
    email: email,
  });

  if (existingUser) throw "This email already exists! Please try another!";

  // If everything is good, move forward!

  // Hasing password so that even if our DB is compromised, we dont expose user passwords. Hashed password cannot be converted back into original string, can only be compared..

  let encryptedPassword = await bcrypt.hash(password, 8);

  await usersModel.create<IUsersModel>({
    email,
    name,
    password: encryptedPassword.toString(),
  });

  res.status(200).json({
    status: "success",
    message: "Account created successfully!",
  });
};

export default usersRegister;
