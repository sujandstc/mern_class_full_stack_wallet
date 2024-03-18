import { Request, Response } from "express";
import bankModel from "../../../models/banks.model";

// Protected route...

const linkBankAccount = async (req: Request, res: Response) => {
  const { account_number, account_name, bank_name } = req.body;

  if (!account_name) throw "Account name is required!";
  if (!account_number) throw "Account number is required!";
  if (!bank_name) throw "Bank name is required!";

  await bankModel.create({
    user_id: req.user.user_id,
    account_number,
    account_name,
    bank_name,
  });

  res.status(200).json({
    status: "success",
    data: "Bank linked successfully!",
  });
};

export default linkBankAccount;
