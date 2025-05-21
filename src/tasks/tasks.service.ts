import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuid } from 'uuid';

import { Task } from './interfaces/tasks.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(dto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: dto.title,
      description: dto.description,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  updateTask(id: string, dto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    if (dto.title) task.title = dto.title;
    if (dto.description) task.description = dto.description;
    if (dto.status) task.status = dto.status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
