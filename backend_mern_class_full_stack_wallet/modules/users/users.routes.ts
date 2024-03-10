import { Router } from "express";
import usersSignup from "./controllers/usersSignup";
import usersLogin from "./controllers/usersLogin";

const usersRoute = Router();

// Passing usersSignup controller to this route
usersRoute.post("/", usersSignup);
usersRoute.post("/login", usersLogin);

export default usersRoute;
