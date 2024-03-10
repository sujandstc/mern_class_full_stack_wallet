import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { uuid } from "uuidv4";
import usersModel from "../../../models/users.model";

const usersLogin = async (req: Request, res: Response) => {
  // Getting data from req.body.
  const { email, password } = req.body;

  // Generate uniqueID..

  const uniqueId = uuid();

  try {
    // General validations...
    if (!email) throw "Email is required!";
    if (!password) throw "Password is required";

    // Get user that matches email provided by user...

    const getUser = await usersModel.findOne({
      email: email,
    });

    if (!getUser) throw "This user doesnot exist!";

    // If everything is good, move forward!

    // Compare password!
    let comparePassword = await bcrypt.compare(password, getUser.password);
    if (!comparePassword) throw "Password donot match!";

    await usersModel.updateOne({ email: email }, { auth_id: uniqueId });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      auth_id: uniqueId,
    });
  } catch (e) {
    console.log(e);

    if (typeof e === "string") {
      res.status(400).json({
        status: "Failed",
        message: e,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Something went wrong!",
      });
    }
  }
};

export default usersLogin;
