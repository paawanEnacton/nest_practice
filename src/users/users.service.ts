import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Object> {
    try {
      const getData = await this.prisma.user.findMany({});
      return {
        statusCode: HttpStatus.CREATED,
        status: true,
        message: 'OK',
        data: getData,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        status: false,
        message: error.message,
        data: null,
      };
    }
  }
  async findById(userId: number): Promise<Object> {
    try {
      const getData = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        status: true,
        message: 'OK',
        data: getData,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        status: false,
        message: error.message,
        data: null,
      };
    }
  }
  async createUser(data: CreateUserDto): Promise<Object> {
    try {
      const getData = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (getData) {
        return {
          statusCode: HttpStatus.CONFLICT,
          status: false,
          message: 'User already exists',
          data: null,
        };
      }
      const createData = await this.prisma.user.create({
        data,
      });

      return {
        statusCode: HttpStatus.CREATED,
        status: true,
        message: 'OK',
        data: createData,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        status: false,
        message: error.message,
        data: null,
      };
    }
  }
  async loginUser(data: LoginUserDto): Promise<Object> {
    try {
      const loginData = await this.prisma.user.findFirst({
        where: {
          email: data.email,
          password: data.password,
        },
      });

      if (!loginData) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          status: false,
          message: 'User does not exist',
          data: null,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        status: true,
        message: 'OK',
        data: loginData,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        status: false,
        message: error.message,
        data: null,
      };
    }
  }
}
