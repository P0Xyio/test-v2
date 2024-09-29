import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { type Request as ExpressRequest } from 'express';

interface AuthRequest extends ExpressRequest {
  user?: {
    userId: number;
  };
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return await this.userService.login(dto);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto);
  }

  @UseGuards(JwtGuard)
  @Get('')
  @HttpCode(200)
  async getUser(@Request() req: AuthRequest) {
    if (!req.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.userService.findById(req.user.userId);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return {
      email: user.email,
      name: user.name,
    };
  }
}
