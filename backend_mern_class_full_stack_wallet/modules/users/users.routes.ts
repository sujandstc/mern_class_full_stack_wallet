import { Router } from "express";
import usersRegister from "./controllers/userRegister";
import usersLogin from "./controllers/usersLogin";
import userProfile from "./controllers/userProfile";
import editProfile from "./controllers/editProfile";
import auth from "../../handlers/auth";
import forgotPassword from "./controllers/userForgotPassword";
import resetPassword from "./controllers/resetPassword";
import changePassword from "./controllers/changePassword";

const userRouter = Router();

// Un-protected routes.. does not require login...
userRouter.post("/register", usersRegister);
userRouter.post("/login", usersLogin);
userRouter.post("/forgot-pw", forgotPassword);
userRouter.post("/reset-pw", resetPassword);

// Auth middleware to restrict unauthorized user from accessing protected routes below:
userRouter.use(auth);

// Protected routes...
userRouter.get("/my-profile", userProfile);
userRouter.patch("/my-profile", editProfile);
userRouter.post("/changePassword", changePassword);

export default userRouter;
