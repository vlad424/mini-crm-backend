import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CredentialsDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma : PrismaService) {}

  async login(credentials: CredentialsDto) {
    if(credentials.isCa === true) {
      const counterAgent = await this.prisma.counterAgent.findFirst({
        where: {INN: credentials.login},
        include: {
          role: true
        }
      })
      if(!counterAgent) throw new BadGatewayException()

      return {
        ...counterAgent,
        role: counterAgent.role.name_role
        
      }
    }
    else {
      const admin = await this.prisma.admin.findUnique({
        where: {
          login: credentials.login
        },
        select: {
          lastName: true,
          firstName: true,
          login: true,
          role: true,
          id: true,
          uids: true
        }
      })
  
      if(!admin) throw new BadGatewayException()
  
      return {
        lastName: admin.lastName,
        firstName: admin.firstName,
        login: admin.login,
        role: admin.role.name_role,
        id: admin.id,
        uids: admin.uids
      }
    }
  }
}
