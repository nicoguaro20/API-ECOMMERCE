import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.services';
import { UsersRepository } from './users.repository';
import { UsersController } from './user.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity'
import { UsersDbService} from './usersDb.service'
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserService,
        UsersDbService,
        UsersRepository
    ],
    controllers: [
        UsersController
    ],
    exports: [
        UsersRepository
    ],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('users');
    };
};