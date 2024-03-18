import { Router } from "express";
import auth from "../../handlers/auth";
import linkBankAccount from "./controllers/linkBankAccount";

const bankRouter = Router();

// Auth middleware to restrict unauthorized user from accessing protected routes below:
bankRouter.use(auth);

// Protected routes...
bankRouter.post("/", linkBankAccount);

export default bankRouter;
