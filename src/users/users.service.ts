import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserRegisterDto } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
  async register(registerDto: UserRegisterDto) {
    const passwordHash = await this.hashPassword(registerDto.password);
    const newUser = new this.userModel({ ...registerDto, passwordHash });
    return newUser.save();
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('hashedPassword: ', hashedPassword);
    return hashedPassword;
  }
}
