import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private prsima : PrismaService) {}

  async getStatistic(adminId : number) {
    let all_orders : any = await this.prsima.statistic.findMany({
      where: {
        adminId: +adminId
      },
      select: {
        id: true,
        expenses: true,
        incomes: true,
        products: true,
        counterAgentId: true,
      },
    })

    for(let i = 0; i < all_orders.length; i++) {
      const user_name = await this.prsima.counterAgent.findUnique({
        where: {
          id: +all_orders[i].counterAgentId
        },
        select: {
          name: true
        }
      })

      all_orders[i].counterAgentId = user_name.name
    }

    return all_orders
  }
}
