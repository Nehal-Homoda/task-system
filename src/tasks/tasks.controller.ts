import { Controller, Post, Body,Get,Param,Patch ,Delete} from "@nestjs/common";
import { taskService } from "./tasks.service";
//import path from "path";

@Controller('tasks')
export class taskController {
    
//we should inject service 
    constructor(private tasksService: taskService) {


    }


    @Post()
    //the incoming request should have data to insert iy
    async addProduct(@Body('title') TaskTitle: string,
        @Body('status') TaskStatus: string,
        @Body('timeSpent') TaskTimeSpent: number): Promise<any> { 
            console.log(TaskTitle,TaskStatus,TaskTimeSpent);
        await this.tasksService.insertTask(TaskTitle, TaskStatus, TaskTimeSpent);
     

    }
    @Get()
    async getAllTasks(){
        const task =await this.tasksService.getTasks();
        return task.map(task=>({id:task.id,title:task.title,status:task.status,timeSpent:task.timeSpent}));
    }


    @Get(':id')
    getProduct(@Param('id') taskId:string){
        return this.tasksService.getSingleTask(taskId);
    }
   @Patch(':id')
    async updateTask(@Param('id') taskId:string,@Body('title') taskTitle:string,@Body('status') taskStatus:string,@Body('timeSpent') timeSpent:number){
      await this.tasksService.updateTask(taskId,taskTitle,taskStatus,timeSpent)
      return null;
    }
    @Delete(':id')
    async deleteTask(@Param ('id') taskId:string){
      await  this.tasksService.deleteTask(taskId);
        return null;
    }

}