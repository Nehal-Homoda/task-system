import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//decorator for class
//  if i write  something in controller only request that start with /tasks would reach controller
//we filter request by @controller
@Controller()
export class AppController {

  //dependency injection 
  constructor(private readonly appService: AppService) {}

  //decorator for method
  //only empty path can reach to this method
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
