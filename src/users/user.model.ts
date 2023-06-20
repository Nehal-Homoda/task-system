import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export interface User extends mongoose.Document {
  username: string;
  passwordHash: string;
  name: string;
  email: string;
}

export interface UserRegisterDto {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface UserLoginDto {
  username: string;
  password: string;
}
