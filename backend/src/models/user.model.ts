import Mongoose, { Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ENV from "../env.ts";

// Define the user interface
export interface IUser extends Document {
  _id: Mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string | null;
  resumeHistory: Mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

const UserSchema = new Mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, // Google Profile Picture
      default: "",
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resumeHistory: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "ResumeScan",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function (): Promise<string> {
  return await jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
    },
    ENV.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = async function (): Promise<string> {
  return await jwt.sign(
    {
      _id: this._id,
    },
    ENV.REFRESH_TOKEN_SECRET,
    {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = Mongoose.model<IUser>("User", UserSchema);
export default User;
