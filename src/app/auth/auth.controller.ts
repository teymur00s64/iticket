import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { join } from 'path';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgetPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.logIn(body);
  }

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  // Experimental url
  @Get('forget_password')
  renderForgetPassword(@Res() res: Response) {
    res.setHeader('content-type', 'text/html');
    res.sendFile(join(__dirname, '../../templates/forget_password_ui.hbs'));
  }

  @Post('forget_passwrod')
  forgetPassword(@Body() body: ForgetPasswordDto) {
    return this.authService.forgetPassword(body);
  }

  @Post('reset_password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}
