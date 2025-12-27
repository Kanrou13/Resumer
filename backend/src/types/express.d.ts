import { IUser } from "../models/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      cloudinaryResult?: any;
      aiAnalysisResult?: any;
      resumeText?: string;
    }
  }
}

export {};
