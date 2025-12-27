import Router from "express";
import verifyJWT from "../middlewares/auth.middleware";
import {
  ResumeScanHistory,
  fetchResumeScanById,
} from "../controllers/profile.controllers";

const profileRouter = Router();

profileRouter.get("/history", verifyJWT, ResumeScanHistory);

profileRouter.get("/:id", verifyJWT, fetchResumeScanById);
export default profileRouter;
