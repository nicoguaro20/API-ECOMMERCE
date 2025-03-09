import { Controller, Get, Post, Delete, Put, Param, Body, HttpCode, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.services';
import { validateUser } from 'src/utils/validate';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesGuard } from 'src/Auth/guards/roles.guard';
import { Roles } from 'src/decorators/role/decorators.role';
import { Role } from 'src/enum/roles.enum';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UserService,
    private readonly usersDbService: UsersDbService,
  ) {}

  @HttpCode(200)
  @Get('/list')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.usersService.getUsers(page, limit);
  };

  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getById(id);
  };

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: CreateUserDto) {
    if (validateUser(updateUser)) {
      return this.usersService.update(id, updateUser);
    }
    return 'Usuario no válido';
  };

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  };
};