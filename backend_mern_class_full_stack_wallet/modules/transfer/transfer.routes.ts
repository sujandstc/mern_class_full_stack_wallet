import { Router } from "express";
import auth from "../../handlers/auth";
import transferMoney from "./controllers/transferMoney";
import getTransactions from "./controllers/getTransactions";

const transferRouter = Router();

transferRouter.use(auth);

// Protected routes...
transferRouter.post("/", transferMoney);


transferRouter.get("/transactions", getTransactions);

export default transferRouter;
