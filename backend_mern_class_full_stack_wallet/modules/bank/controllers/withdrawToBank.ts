import { Request, Response } from "express";
import bankModel from "../../../models/banks.model";
import usersModel from "../../../models/users.model";
import mongoose from "mongoose";
import transactionsModel from "../../../models/transactions.model";

// Protected route...

const withdrawToBank = async (req: Request, res: Response) => {
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

  // get user data...

  const getMyData = await usersModel.findOne({
    _id: req.user.user_id,
  });

  if (!getMyData) throw "User not found!";

  if (getMyData.balance < balance) throw "Not enough funds to withdraw!";

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
          balance: balance * 1,
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
          transaction_type: "withdraw",
          balance: balance,
          info: `Withdrawn ${balance} to ${getBank.bank_name} (${getBank.account_number})`,
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
          balance: balance * -1,
        },
      },
      {
        session,
      }
    );
  });

  res.status(200).json({
    status: "success",
    data: "Amount withdrawn successfully!",
  });
};

export default withdrawToBank;
