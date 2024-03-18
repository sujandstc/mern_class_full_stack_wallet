import mongoose from "mongoose";

const banksSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    bank_name: {
      type: String,
      required: true,
    },

    account_name: {
      type: String,
      required: true,
    },

    account_number: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const bankModel = mongoose.model("banks", banksSchema);

export default bankModel;
