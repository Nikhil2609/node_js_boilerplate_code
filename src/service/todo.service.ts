import { todos } from '@prisma/client';
import TodoRepository from '../repository/todo.repository';

export default class TodoService {
  private todoRepository: TodoRepository;

  constructor(todoService: TodoRepository) {
    this.todoRepository = todoService;
  }

  getTodos = async (skipRows: number): Promise<{ totalRows: number; todos: todos[] }> => {
    return this.todoRepository.getTodos(skipRows);
  };

  getTodosById = async (id: number): Promise<todos | null> => {
    return this.todoRepository.getTodosById(id);
  };

  createTodo = async (data: todos): Promise<todos> => {
    return this.todoRepository.createTodo(data);
  };

  updateTodo = async (id: number, data: todos) => {
    return this.todoRepository.updateTodo(id, data);
  };

  deleteTodo = async (id: number) => {
    return this.todoRepository.deleteTodo(id);
  };
}
