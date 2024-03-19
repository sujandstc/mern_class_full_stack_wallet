import { Router } from "express";
import auth from "../../handlers/auth";
import linkBankAccount from "./controllers/linkBankAccount";
import allBankAccounts from "./controllers/allBankAccounts";
import loadBalanceFromBank from "./controllers/loadBalanceFromBank";
import withdrawToBank from "./controllers/withdrawToBank";

const bankRouter = Router();

// Auth middleware to restrict unauthorized user from accessing protected routes below:
bankRouter.use(auth);

// Protected routes...
bankRouter.post("/", linkBankAccount);
bankRouter.get("/", allBankAccounts);

bankRouter.post("/load", loadBalanceFromBank);
bankRouter.post("/withdraw", withdrawToBank);

export default bankRouter;
