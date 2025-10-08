import prisma from '../prisma';
import { todos } from '@prisma/client';
import { ROWS_PER_PAGE } from '../utils/constant';

export default class TodoRepository {
  constructor() {}

  getTodos = async (skipRows: number) => {
    const totalRows = await prisma.todos.count();
    const todos = await prisma.todos.findMany({
      skip: skipRows,
      take: ROWS_PER_PAGE
    });
    return { totalRows, todos };
  };

  getTodosById = async (id: number) => {
    const todo = await prisma.todos.findUnique({ where: { id } });
    return todo;
  };

  createTodo = async (data: todos) => {
    const todo = await prisma.todos.create({ data: data });
    return todo;
  };

  updateTodo = async (id: number, data: todos) => {
    return await prisma.todos.update({ where: { id }, data });
  };

  deleteTodo = async (id: number) => {
    return await prisma.todos.delete({ where: { id } });
  };
}
