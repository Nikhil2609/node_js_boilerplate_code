import express from "express";
import authRouter from "./auth.route";
import todoRouter from "./todo.route";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter)
indexRouter.use("/todos", todoRouter)

export default indexRouter;