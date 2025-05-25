import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(dto);
    return task.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTasks(
    status?: TaskStatus,
    search?: string,
    page = 1,
    limit = 10,
    sort: 'latest' | 'oldest' = 'latest',
  ): Promise<Task[]> {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    return this.taskModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async getTaskById(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException(`Task with ID ${id} not found`);
    return updated;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    task.isDeleted = true;
    await task.save();
  }
}
