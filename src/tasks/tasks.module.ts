import { Module } from "@nestjs/common";
import { taskController } from "./tasks.controller";
import { taskService } from "./tasks.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskShema } from "./tasks.model";
@Module({
    //passing data to forFeature to allow automatically inject this model to anyone need
     imports:[MongooseModule.forFeature([{name:'Task',schema:TaskShema}])],
    controllers:[taskController],
    providers:[taskService]

})
export class TasksModule{

}