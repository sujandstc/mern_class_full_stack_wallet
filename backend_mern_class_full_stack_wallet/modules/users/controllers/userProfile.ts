import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

// Protected route...

const userProfile = async (req: Request, res: Response) => {
  const getUser = await usersModel.findOne({
    _id: req.user.user_id,
  });

  if (!getUser) throw "User doesnot exists";

  res.status(200).json({
    status: "success",
    data: getUser,
  });
};

export default userProfile;
