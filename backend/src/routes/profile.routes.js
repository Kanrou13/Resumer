import Router from "express";
import verifyJWT from "../middlewares/auth.middleware.js";


const profileRouter = Router();


profileRouter.get("/pt")