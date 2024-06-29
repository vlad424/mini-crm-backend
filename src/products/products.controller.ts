import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddCatalogAction, GetCatalogsType, AddProductAction, product } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @HttpCode(200)
  @Get(':id')
  async getCatalogs(@Param() adminId: GetCatalogsType) {
    return this.productsService.getCatalogs(adminId)
  }
  @HttpCode(200)
  @Post(':id')
  async addSomething(@Body() req : AddCatalogAction | AddProductAction ) {
    if(req.action === 'add_category') return this.productsService.addCategory(req.adminId, req.data)
    if(req.action === 'add_product')  return this.productsService.addProduct(req.adminId, req.data)
  }
  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Body() product: product) {
    return this.productsService.deleteCategory(product)
  }
}
