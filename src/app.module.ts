import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb://nehal:nehal123@ac-8nsuoew-shard-00-00.kygni2i.mongodb.net:27017,ac-8nsuoew-shard-00-01.kygni2i.mongodb.net:27017,ac-8nsuoew-shard-00-02.kygni2i.mongodb.net:27017/Nehal?replicaSet=atlas-8x9qi6-shard-0&ssl=true&authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
