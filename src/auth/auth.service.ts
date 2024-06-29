import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CredentialsDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(credentials: CredentialsDto) {
    if (credentials.isCa === true) {
      const counterAgent = await this.prisma.counterAgent.findFirst({
        where: { INN: credentials.login },
        include: {
          role: true,
        },
      });
      if (!counterAgent) throw new BadGatewayException();

      if (counterAgent.password === credentials.password) {
        return {
          ...counterAgent,
          role: counterAgent.role.name_role,
        };
      } else throw new HttpException('NON AUTH', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    } 
    else {
      const admin = await this.prisma.admin.findUnique({
        where: {
          login: credentials.login,
        },
        select: {
          lastName: true,
          firstName: true,
          login: true,
          role: true,
          id: true,
          uids: true,
          password: true
        },
      });

      if (!admin) throw new BadGatewayException();

      if (admin.password === credentials.password) {
        return {
          lastName: admin.lastName,
          firstName: admin.firstName,
          login: admin.login,
          role: admin.role.name_role,
          id: admin.id,
          uids: admin.uids,
        };
      }
      else throw new HttpException('NON AUTH', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }
  }
}
