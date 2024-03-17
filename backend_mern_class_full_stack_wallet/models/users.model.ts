import mongoose, { InferSchemaType } from "mongoose";

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

    location: {
      type: String,
    },

    phone: {
      type: String,
    },

    balance: {
      type: Number,
      default: 0,
    },

    reset_password_token: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", usersSchema);

export default usersModel;
