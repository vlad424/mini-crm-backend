import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CredentialsDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma : PrismaService) {}

  async login(credentials: CredentialsDto) {
    const user = await this.prisma.admin.findUnique({
      where: {
        login: credentials.login
      },
      select: {
        lastName: true,
        firstName: true,
        login: true,
        id: true
      }
    })

    if(!user) throw new NotFoundException('user not found')

    return user
  }
}
