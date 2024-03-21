import { Request, Response } from "express";
import mongoose from "mongoose";
import validator from "validator";
import usersModel from "../../../models/users.model";
import transactionsModel from "../../../models/transactions.model";
// Protected route...

const transferMoney = async (req: Request, res: Response) => {
  const { friend_email, amount } = req.body;

  if (!friend_email) throw "Friend email is required!";
  if (!amount) throw "Amount is required!";

  if (!validator.isEmail(friend_email.toString())) throw "Invalid email!";
  if (!validator.isNumeric(amount.toString())) throw "Invalid amount";

  if (amount < 1) throw "Amount must be at least 1 rupees.";

  // Checking if friend exists.

  const getFriend = await usersModel.findOne({
    email: friend_email,
  });

  if (!getFriend) throw "User with this email is not available.";

  /// get own id...

  const getOwnAccount = await usersModel.findOne({
    _id: req.user.user_id,
  });

  if (!getOwnAccount) throw "Code: 434343";

  if (getOwnAccount.balance < amount) throw "Insufficient balance.";

  // Database operation...

  const session = await mongoose.startSession();
  await session.withTransaction(async (session) => {
    // Deducting money from sender account!
    await usersModel.updateOne(
      {
        _id: req.user.user_id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      }
    );

    // Create own transaction log...

    await transactionsModel.create(
      [
        {
          user_id: req.user.user_id,
          transaction_type: "sent",
          balance: amount,
          info: `Sent ${amount} money to ${friend_email}`,
        },
      ],
      {
        session: session,
      }
    );

    // Adding money to receiver account!
    await usersModel.updateOne(
      {
        email: friend_email,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    );

    // create transaction log for friend..

    await transactionsModel.create(
      [
        {
          user_id: getFriend._id,
          transaction_type: "received",
          balance: amount,
          info: `Received ${amount} money from ${getOwnAccount.email}`,
        },
      ],
      {
        session: session,
      }
    );
  });

  res.status(200).json({
    status: "success",
    data: "Funds transferred successfully!",
  });
};

export default transferMoney;
