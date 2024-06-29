import { Body, Controller, Get, HttpCode, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @HttpCode(200)
  @Get(':id')
  async getStatistic(@Param() data: {id: number}) {
    return this.statisticService.getStatistic(data.id)
  }
}
