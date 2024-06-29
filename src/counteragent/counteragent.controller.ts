import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CounteragentService } from './counteragent.service';
import { AddCounterAgentDto } from './couteragent.dto';

@Controller('invite-counteragent')
export class CounteragentController {
  constructor(private readonly counteragentService: CounteragentService) {}

  @HttpCode(200)
  @Post(':id')
  async addCounteragent(@Body() counterAgentData : AddCounterAgentDto) {
    return this.counteragentService.addCounteragent(counterAgentData)
  }
  @HttpCode(200)
  @Get(':id')
  async getCounterAgents(@Param() adminId: {id: number}) {
    return this.counteragentService.getCounterAgents(adminId.id)
  }
  @HttpCode(200)
  @Patch(':id')
  async acceptOrder(@Body() data: {orderId: number, adminId: number}) {
    return this.counteragentService.acceptOrder(data)
  }
}
