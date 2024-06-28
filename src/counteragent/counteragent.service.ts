import { BadGatewayException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddCounterAgentDto } from './couteragent.dto';

@Injectable()
export class CounteragentService {
  constructor(private prisma: PrismaService) {}

  async addCounteragent(counterAgentData : AddCounterAgentDto) {
    const counterAgent = await this.prisma.counterAgent.findFirst({
      where: {
        INN: counterAgentData.INN
      }
    })
    if(counterAgent) throw new BadGatewayException('user already exists')
    
    const counterAgentCreated = await this.prisma.counterAgent.create({
      data: {
        name: counterAgentData.name,
        country: counterAgentData.country,
        INN: counterAgentData.INN,
        KPP: counterAgentData.KPP,
        OGRN: counterAgentData.OGRN,
        adminId: counterAgentData.adminId,
        roleId: 1,
        password: counterAgentData.password
      }
    })

    const admin = await this.prisma.admin.findUnique({
      where: { id: +counterAgentData.adminId},
      select: { uids: true}
    })

    const adminChange = await this.prisma.admin.update({
      where: {
        id: counterAgentData.adminId
      },
      data: {
        uids: [...admin.uids, counterAgentCreated.id ] 
      }
    })

    return {
      status: HttpStatus.CREATED,
      msg: "user created",
      data: {
        counterAgent: counterAgentCreated,
        whereAdmin: adminChange
      }
    }
  }
  async getCounterAgents(adminId: number) {
    const invites = [
      
    ]
    const admin_invites = await this.prisma.admin.findUnique({
      where: {
        id: +adminId
      },
      select: {
        uids: true
      }
    })

    for(let i = 0; i < admin_invites.uids.length; i++) {
      invites.push({
        counter_agent: await this.prisma.counterAgent.findUnique({
          where: {id: admin_invites.uids[i]}
        }),
        orders: await this.prisma.orderStatus.findMany({
          where: {counterAgentId: admin_invites.uids[i]}
        })
      })
    } 

    return invites
  }
  async acceptOrder(data: {orderId: number, adminId: number}) {
    await this.prisma.orderStatus.update({
      where: {id: data.orderId},
      data: {
        status: 'accepted'
      }
    })
  }
}
