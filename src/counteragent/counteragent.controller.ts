import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CounteragentService } from './counteragent.service';
import { AddCounterAgentDto } from './couteragent.dto';

@Controller('invite-counteragent')
export class CounteragentController {
  constructor(private readonly counteragentService: CounteragentService) {}

  @Post(':id')
  async addCounteragent(@Body() counterAgentData : AddCounterAgentDto) {
    return this.counteragentService.addCounteragent(counterAgentData)
  }
  @Get(':id')
  async getCounterAgents(@Param() adminId: {id: number}) {
    return this.counteragentService.getCounterAgents(adminId.id)
  }
  @Patch(':id')
  async acceptOrder(@Body() data: {orderId: number, adminId: number}) {
    return this.counteragentService.acceptOrder(data)
  }
}
