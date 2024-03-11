import mongoose, { InferSchemaType } from "mongoose";

export interface IUsersModel {
  email: string;
  password: string;
  name: string;
  balance?: number;
}

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    auth_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", usersSchema);

export default usersModel;
