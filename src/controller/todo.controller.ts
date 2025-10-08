import { NextFunction, Request, Response } from 'express';
import TodoService from '../service/todo.service';
import { SuccessResponse, ErrorResponse } from '../utils/responseHelper';
import { STATUS_CODE } from '../utils/enum';
import { TODO_MESSAGE } from '../utils/message';
import { redisClient } from '../redisClient';
import { ROWS_PER_PAGE } from '../utils/constant';
import { IMetaPaginationResponse } from '../utils/interface/IApiResponse';

export default class TodoController {
  private todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  getTodos = async (req: Request, res: Response) => {
    const currentPage = Number(req.query.page) || 1;
    const skipRows = (currentPage - 1) * ROWS_PER_PAGE;
    console.log('user=>', (req as any)?.user);

    const todoResponse = await this.todoService.getTodos(skipRows);

    const { todos, totalRows } = todoResponse;
    const message = todos?.length ? TODO_MESSAGE.FETCH : TODO_MESSAGE.NOT_FOUND;

    const meta: IMetaPaginationResponse = {
      totalRows,
      currentPage,
      totalPages: Math.ceil(totalRows / ROWS_PER_PAGE)
    };

    // redis caching implementation
    // redisClient.set('todos', JSON.stringify(todos));

    return SuccessResponse(res, STATUS_CODE.OK, todos, message, meta);
  };

  getTodosById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const todo = await this.todoService.getTodosById(Number(id));
    if (!todo) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, TODO_MESSAGE.NOT_FOUND);
    }

    return SuccessResponse(res, STATUS_CODE.OK, todo, TODO_MESSAGE.FETCH);
  };

  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todo = await this.todoService.createTodo(req.body);
    console.log('user=>', (req as any).user); // we can use this as admin user email for account base operation
    return SuccessResponse(res, STATUS_CODE.CREATED, todo, TODO_MESSAGE.CREATE);
  };

  updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await this.todoService.getTodosById(Number(id));
    if (!todo) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, TODO_MESSAGE.NOT_FOUND);
    }

    const updateTodo = await this.todoService.updateTodo(Number(id), req.body);
    return SuccessResponse(res, STATUS_CODE.OK, updateTodo, TODO_MESSAGE.UPDATE);
  };

  deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const todo = await this.todoService.getTodosById(Number(id));
    if (!todo) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, TODO_MESSAGE.NOT_FOUND);
    }

    await this.todoService.deleteTodo(Number(id));
    return SuccessResponse(res, STATUS_CODE.OK, null, TODO_MESSAGE.DELETE);
  };
}
