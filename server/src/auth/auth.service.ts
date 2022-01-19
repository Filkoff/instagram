import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { CreateUsertDto } from 'src/user/dto/create-user.dto';

import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);

    const token = await this.generateToken(user);

    return { ...token, user };
  }

  async registration(userDto: CreateUsertDto) {
    const person = await this.userService.getUserByEmail(userDto.email);
    if (person) {
      throw new HttpException(
        'User with this email is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async auth(authHeader) {
    const token = authHeader.split(' ')[1];
    const userData = this.jwtService.verify(token);
    const user = await this.userService.getUserByEmail(userData.email);
    console.log(user);

    return user;
  }

  private async generateToken(user) {
    const payload = { email: user.email, id: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Invalid email or password' });
  }
}
