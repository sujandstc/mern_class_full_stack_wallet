import { Request, Response } from "express";
import bankModel from "../../../models/banks.model";
import usersModel from "../../../models/users.model";
import transactionsModel from "../../../models/transactions.model";
import mongoose from "mongoose";

// Protected route...

const loadBalanceFromBank = async (req: Request, res: Response) => {
  const { bank_id, balance } = req.body;

  if (!bank_id) throw "Bank id is required!";
  if (!balance) throw "Balance is required!";

  // Third party api...

  // Bank ko part...

  const getBank = await bankModel.findOne({
    _id: bank_id,
    user_id: req.user.user_id,
  });

  if (!getBank) throw "Bank not found!";

  if (getBank.balance < balance) throw "Not enough balance.";

  // Amount is loaded...

  const session = await mongoose.startSession();
  await session.withTransaction(async (session) => {
    await bankModel.updateOne(
      {
        _id: bank_id,
        user_id: req.user.user_id,
      },
      {
        $inc: {
          balance: balance * -1,
        },
      },
      {
        session: session,
      }
    );

    // log...

    await transactionsModel.create(
      [
        {
          user_id: req.user.user_id,
          transaction_type: "load",
          balance: balance,
          info: `Loaded ${balance} from ${getBank.bank_name} (${getBank.account_number})`,
        },
      ],
      {
        session: session,
      }
    );

    // user side..

    await usersModel.updateOne(
      {
        _id: req.user.user_id,
      },
      {
        $inc: {
          balance: balance,
        },
      },
      {
        session,
      }
    );
  });

  res.status(200).json({
    status: "success",
    data: "Amount loaded successfully!",
  });
};

export default loadBalanceFromBank;
