//mongoose package work with model which are in end blueprint for js object
import * as mongoose from 'mongoose';
export const TaskShema=new mongoose.Schema({
title:{type:String,required:true},
status:{type:String,required:true},
 timeSpent:{type:Number,required:true},
});


//why using interface instead of class and remove constructor
export interface Tasks{
 id:string;
 title:string ;
  status:string;
  timeSpent:number;
  userId:string;
}