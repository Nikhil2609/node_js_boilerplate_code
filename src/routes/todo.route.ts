import express from 'express';
import { cacheMiddleware } from '../middleware/cache.middleware';
import { todoSchema } from '../utils/validation/todo.validate';
import { celebrate } from 'celebrate';
import TodoController from '../controller/todo.controller';
import TodoService from '../service/todo.service';
import TodoRepository from '../repository/todo.repository';

const todoRouter = express.Router();

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

todoRouter.get('/:id', celebrate(todoSchema.GetById), todoController.getTodosById);
todoRouter.get('/', celebrate(todoSchema.List), todoController.getTodos);
// todoRouter.get("/", cacheMiddleware, todoController.getTodos); redis caching implementation
todoRouter.post('/', celebrate(todoSchema.Create), todoController.createTodo);
todoRouter.put('/:id', celebrate(todoSchema.Update), todoController.updateTodo);
todoRouter.delete('/:id', celebrate(todoSchema.Delete), todoController.deleteTodo);

export default todoRouter;
