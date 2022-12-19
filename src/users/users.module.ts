import { PrismaService } from './../prisma.service';
import { MiddlewaresMiddleware } from './../middlewares/middlewares.middleware';
import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewaresMiddleware).forRoutes('users');
  }
}
