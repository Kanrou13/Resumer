import Router from "express";
import { handleAnalyzeResume } from "../controllers/analyze.controllers";
import upload from "../middlewares/memory.middleware";
import verifyJWT from "../middlewares/auth.middleware";

const analyzeRouter = Router();

analyzeRouter.post(
  "/analyze",
  verifyJWT,
  upload.single("resume"),
  handleAnalyzeResume
);
// analyzeRouter.get("/analyze", handleGetAnalysisResult); // Commented out as it was imported from wrong file and might not exist yet

export default analyzeRouter;
