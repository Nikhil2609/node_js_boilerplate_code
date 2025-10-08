import express from 'express';
import authRouter from './auth.route';
import todoRouter from './todo.route';
import { rateLimiterMiddleware } from '../middleware/ratelimit.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const indexRouter = express.Router();

// indexRouter.use("/auth", rateLimiterMiddleware, authRouter)
indexRouter.use('/auth', authRouter);
indexRouter.use('/todos', authMiddleware, todoRouter);

export default indexRouter;
