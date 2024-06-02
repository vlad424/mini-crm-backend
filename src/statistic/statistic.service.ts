import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private prsima : PrismaService) {}

  async getStatistic(adminId : number) {
    const all_orders = await this.prsima.orderStatus.findMany({
      where: {
        adminId: +adminId,
        status: 'accepted'
      },
      select: {
        subtotal: true
      }
    })

    return all_orders
  }
}
