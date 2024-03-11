import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

// Protected route...

const userProfile = async (req: Request, res: Response) => {
  const getUser = await usersModel.findOne({
    auth_id: req?.headers?.authorization?.split(" ")[1] ?? "",
  });

  if (!getUser) throw "User doesnot exists";

  res.status(200).json({
    status: "success",
    data: getUser,
  });
};

export default userProfile;
