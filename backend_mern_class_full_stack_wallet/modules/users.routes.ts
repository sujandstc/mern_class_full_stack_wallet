import { Router } from "express";
import usersSignup from "./users/controllers/usersSignup";
import usersLogin from "./users/controllers/usersLogin";

const usersRoute = Router();

// Passing usersSignup controller to this route
usersRoute.post("/", usersSignup);
usersRoute.post("/login", usersLogin);

export default usersRoute;
