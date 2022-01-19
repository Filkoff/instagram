import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateUsertDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUsertDto) {
    return this.authService.registration(userDto);
  }

  @Get('/auth')
  authent(@Headers() headers) {
    return this.authService.auth(headers.authorization);
  }
}
