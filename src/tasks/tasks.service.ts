import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDTO } from './dto/create-tasks.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  destroyTask(id: string): void {
    const restOfTasks = this.tasks.filter((item) => item.id !== id);
    this.tasks = restOfTasks;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    this.tasks = this.tasks.map((item) => ({
      ...item,
      status: id === item.id ? status : item.status,
    }));

    return this.getTaskById(id);
  }
}
