import { Body, Controller, Get, Param, Post, HttpCode } from '@nestjs/common';
import { CounteragentQueService } from './counteragent-que.service';
import { BuyProductsDto } from './dto';

@Controller('/counter-agent/')
export class CounteragentQueController {
  constructor(private readonly counteragentQueService: CounteragentQueService) {}

  @HttpCode(200)
  @Get(':id')
  async GetAdminNameAndProducts(@Param() id : number) {
    return this.counteragentQueService.GetAdminNameAndProducts(id)
  }

  @HttpCode(200)
  @Post(':id/cart')
  async BuyProducts(@Body() data : BuyProductsDto) {
    return this.counteragentQueService.BuyProducts(data)
  }
}