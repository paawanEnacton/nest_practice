import { CreateUserDto } from './dto/create-user.dto';
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
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers() {
    return true;
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return true;
  }

  @Post('createUser')
  @UsePipes(new ValidationPipe())
  createUser(@Body() args: CreateUserDto): User {
    return this.usersService.createUser(args);
  }
}
