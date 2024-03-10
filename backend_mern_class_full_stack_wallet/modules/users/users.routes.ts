import { Router } from "express";
import usersRegister from "./controllers/userRegister";
import usersLogin from "./controllers/usersLogin";
import userProfile from "./controllers/userProfile";

const userRouter = Router();

// Auth...
userRouter.post("/register", usersRegister);
userRouter.post("/login", usersLogin);

// Logged in user

// Get user profile!
userRouter.get("/my-profile", userProfile);

export default userRouter;
