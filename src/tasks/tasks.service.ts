import { Injectable, NotFoundException } from "@nestjs/common"
import { Tasks } from "./tasks.model"
import { Model, Mongoose } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";



@Injectable()
export class taskService {

    //an array object from model
    tasks: Tasks[] = [];


    //to inject mongoose model
    //Task as the name defined in tasksModule in forFeature configuration
    
    constructor(@InjectModel('Task') private taskModel: Model<Tasks>) { }
     

     //we can send object rather than individual inputs
    async insertTask(title: string, status: string, timeSpent: number) {
        //we don't pass 4 different argument we pass js object
        const newTask = new this.taskModel({ title: title, status: status, timeSpent: timeSpent });

        // instead of push on localy array i neead to push on array on database
        // this.tasks.push(newTask);
      
        //save provided by mongoose
       const x=await newTask.save();
       console.log(x);
    }
    async getTasks() {
        //as array a refernce type and by that we return a pointer to array not copy
        //we don't now return array
        //return [...this.tasks]
        const task=await this.taskModel.find();
        //?????don't need create new object
        return task as Tasks[];
        
    }


    getSingleTask(taskId: string) {
        const task = this.findTask(taskId);
        return { ...task };

    }


    updateTask(taskId: string, title: string, status: string, timeSpent: number) {
        //why const[]   59
        const [task,index] = this.findTask(taskId);

        //create new task with new data coming in body
        const updatedTask={...task};
        if(title){
            updatedTask.title=title;
        }
        if(status){
            updatedTask.status=status;
        }
        if(timeSpent){
            updatedTask.timeSpent=timeSpent;
        }
        this.tasks[index]=updatedTask;
    }



    deleteTask(id:string){
        //why [1]
        const index=this.findTask(id)[1];
         this.tasks.splice(index,1);
    }




    private findTask(id: string) :[Tasks,number]{
        const taskIndex = this.tasks.findIndex((task) => task.id == id);
        const task=this.tasks[taskIndex];
        if (!taskIndex) {
            throw new NotFoundException('could not find task')
        }
        return [task,taskIndex];

    }
}