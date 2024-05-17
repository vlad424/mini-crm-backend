import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetCatalogsType } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async getCatalogs(@Param() adminId: GetCatalogsType) {
    return this.productsService.getCatalogs(adminId)
  }
}
