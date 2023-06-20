import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserRegisterDto } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() registerDto: UserRegisterDto): any {
    return this.usersService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
}
