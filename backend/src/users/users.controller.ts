import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get() // GET /users or /users?role=value
  findAll(@Req() req: Request) {
    return this.userService.findAll();
  }

  // @Get('interns') // GET /users/interns
  // findAllInterns() {
  //   return [];
  // }

  //:id most be declared after all possible users get calls
  //its a waterfall
  @UseGuards(JwtAuthGuard)
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id, {});
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    user:Prisma.UserCreateInput, // One possible pattern for this would be createUserDto
  ) {
    return this.userService.create(user);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate:Prisma.UserUpdateInput, // One possible pattern for this would be updateUserDto
  ) {
    return this.userService.update(id, userUpdate);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  findUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) findUserDto: FindUserDto,
  ) {
    const { includeRefreshToken, refreshToken } = findUserDto;
    return this.userService.findOne(id, {
      includeRefreshToken,
      refreshToken,
    });
  }
}
