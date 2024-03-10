import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

// Protected route...

const userProfile = async (req: Request, res: Response) => {
  // Auth validation...
  try {
    if (!req.query) throw "Error";
    if (!req.query.auth_id) throw "Error";

    const getAuthUser = await usersModel.findOne({
      auth_id: req.query.auth_id,
    });
    if (!getAuthUser) throw "Error!";
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization error!",
    });

    return;
  }

  const data = await usersModel.findOne({
    auth_id: req.query.auth_id,
  });

  //   if(!getUser) throw "User doesnot exists";

  res.status(200).json({
    status: "success",
    data,
  });
};

export default userProfile;
