import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private prsima : PrismaService) {}

  async getStatistic(adminId : number) {
    const all_orders = await this.prsima.statistic.findMany({
      where: {
        adminId: +adminId
      },
      select: {
        id: true,
        expenses: true,
        incomes: true,
        products: true,
        counterAgentId: true
      }
    })

    return all_orders 
  }
}
