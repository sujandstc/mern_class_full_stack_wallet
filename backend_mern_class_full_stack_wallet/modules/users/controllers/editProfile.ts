import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

// Protected route...

const editProfile = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "Ok good!",
  });
};

export default editProfile;
