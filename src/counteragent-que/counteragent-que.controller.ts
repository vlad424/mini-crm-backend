import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CounteragentQueService } from './counteragent-que.service';
import { BuyProductsDto } from './dto';

@Controller('/counter-agent/')
export class CounteragentQueController {
  constructor(private readonly counteragentQueService: CounteragentQueService) {}

  @Get(':id')
  async GetAdminNameAndProducts(@Param() id : number) {
    return this.counteragentQueService.GetAdminNameAndProducts(id)
  }
  @Post(':id/cart')
  async BuyProducts(@Body() data : BuyProductsDto) {
    return this.counteragentQueService.BuyProducts(data)
  }
}