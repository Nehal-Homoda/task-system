import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { taskService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
//import path from "path";

@Controller('tasks')
export class taskController {
  //we should inject service
  constructor(private tasksService: taskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  //the incoming request should have data to insert iy
  async addTask(
    @Request() req: any,
    @Body('title') TaskTitle: string,
    @Body('status') TaskStatus: string,
    @Body('timeSpent') TaskTimeSpent: number,
  ): Promise<any> {
    console.log(TaskTitle, TaskStatus, TaskTimeSpent, req.user.id);
    await this.tasksService.insertTask(
      TaskTitle,
      TaskStatus,
      TaskTimeSpent,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(@Request() req: any) {
    const task = await this.tasksService.getTasks();
    return task.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      timeSpent: task.timeSpent,
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTask(@Param('id') taskId: string) {
    return await this.tasksService.getSingleTask(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('status') taskStatus: string,
    @Body('timeSpent') timeSpent: number,
  ) {
    await this.tasksService.updateTask(
      taskId,
      taskTitle,
      taskStatus,
      timeSpent,
    );
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/byTitle/:title')
  async searchByTitle(@Param('title') title: string) {
    return await this.tasksService.searchByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/byUserId')
  async searchByUserId(@Request() req: any) {
    return await this.tasksService.searchByUserId(req.user.id);
  }
}
