import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

//in module decorator there is a function that configue decorator
@Module({
  imports: [TasksModule,MongooseModule.forRoot('mongodb://nehal:nehal123@ac-8nsuoew-shard-00-00.kygni2i.mongodb.net:27017,ac-8nsuoew-shard-00-01.kygni2i.mongodb.net:27017,ac-8nsuoew-shard-00-02.kygni2i.mongodb.net:27017/?replicaSet=atlas-8x9qi6-shard-0&ssl=true&authSource=admin')],
  //how you handle request and send back response
  controllers: [AppController],
  //fetch data from back
  providers: [AppService],
})
export class AppModule {}
