import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './auth.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Get('/')
  async getNerver() {
    return {
      msg: "server start"
    }
  }
  @HttpCode(200)
  @Post('/')
  async login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials)
  }
}
