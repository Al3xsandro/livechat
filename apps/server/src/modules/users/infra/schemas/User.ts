import mongoose, { Document, Schema } from "mongoose";

interface IUser {
  _id?: string;
  cpf: string;
  password: string;
}

type IUserDocument = Document & IUser;

const userSchema = new Schema(
  {
    cpf: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("users", userSchema);

export { user, IUserDocument };
