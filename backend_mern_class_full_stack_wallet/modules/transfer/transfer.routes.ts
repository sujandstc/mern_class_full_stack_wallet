import { Router } from "express";
import auth from "../../handlers/auth";
import transferMoney from "./controllers/transferMoney";

const transferRouter = Router();

transferRouter.use(auth);

// Protected routes...
transferRouter.post("/", transferMoney);

export default transferRouter;
