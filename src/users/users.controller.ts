import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Post,
  Controller,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() args: CreateUserDto) {
    return this.usersService.createUser(args);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() args: LoginUserDto) {
    return this.usersService.loginUser(args);
  }
}
