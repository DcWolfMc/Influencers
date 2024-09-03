import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userDto: Prisma.UserCreateInput) {
    const { email, name, password } = userDto;
    const hashedPassword = await hash(password, 10);

    return this.databaseService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });
      return this.removePassword(user);
    });
  }

  async findAll() {
    const users = await this.databaseService.user.findMany({});
    return users.map(user => this.removePassword(user));
  }

  async findOne(id: number, { includeRefreshToken = false }: FindUserDto) {
    const user = await this.databaseService.user.findFirst({
      where: { id },
      include: {
        refreshToken: includeRefreshToken,
      },
    });
    return this.removePassword(user);
  }

  async update(id: number, updatedUser: Prisma.UserUpdateInput) {
    return this.databaseService.$transaction(async (prisma) => {
      const user = await prisma.user.update({
        where: { id },
        data: updatedUser,
      });
      return this.removePassword(user);
    });
  }

  async delete(id: number) {
    return await this.databaseService.user.delete({ where: { id } });
  }

  private removePassword(user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
