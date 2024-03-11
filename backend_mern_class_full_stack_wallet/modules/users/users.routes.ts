import { Router } from "express";
import usersRegister from "./controllers/userRegister";
import usersLogin from "./controllers/usersLogin";
import userProfile from "./controllers/userProfile";
import editProfile from "./controllers/editProfile";
import auth from "../../handlers/auth";

const userRouter = Router();

// Un-protected routes.. does not require login...
userRouter.post("/register", usersRegister);
userRouter.post("/login", usersLogin);

// Auth middleware to restrict unauthorized user from accessing protected routes below:
userRouter.use(auth);

// Protected routes...
userRouter.get("/my-profile", userProfile);
userRouter.patch("/my-profile", editProfile);

export default userRouter;
