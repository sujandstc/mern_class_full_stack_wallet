import { Request, Response } from "express";
import usersModel from "../../../models/users.model";
import bcrypt from "bcrypt";

// Protected route...

const changePassword = async (req: Request, res: Response) => {
  const { current_password, new_password, confirm_password } = req.body;

  if (!current_password) throw "Please provide current password!";
  if (!new_password) throw "Please provide new password!";
  if (new_password != confirm_password) throw "Confirm password donot match!";

  const getUser = await usersModel
    .findOne({
      _id: req.user.user_id,
    })
    .select("+password");

  if (!getUser) throw "This user doesnot exist!";

  // compare password..

  let comparePassword = await bcrypt.compare(
    current_password,
    getUser.password
  );

  if (!comparePassword) throw "Current Password donot match!";

  // If everything is good!..

  let encryptedPassword = await bcrypt.hash(new_password, 8);

  await usersModel.updateOne(
    {
      _id: req.user.user_id,
    },
    {
      password: encryptedPassword,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Updated successfully!",
  });
};

export default changePassword;
