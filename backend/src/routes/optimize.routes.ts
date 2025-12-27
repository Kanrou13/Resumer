import Router from "express";
import verifyJWT from "../middlewares/auth.middleware.ts";
import {
  optimizeResume,
  optimizeJd,
  saveResumeScan,
  uploadToCloudinaryMiddleware,
} from "../controllers/optimize.controllers";
import upload from "../middlewares/memory.middleware.ts";

const optimizeRouter = Router();

optimizeRouter.post(
  "/optimize/general",
  verifyJWT,
  upload.single("resume"),
  uploadToCloudinaryMiddleware,
  optimizeResume,
  saveResumeScan
);

optimizeRouter.post(
  "/optimize/jd",
  verifyJWT,
  upload.single("resume"),
  uploadToCloudinaryMiddleware,
  optimizeJd,
  saveResumeScan
);

export default optimizeRouter;
