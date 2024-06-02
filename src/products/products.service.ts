import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCatalogsType, product } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma : PrismaService) {}

  async getCatalogs(data : GetCatalogsType) {
    const catalogs = await this.prisma.catalog.findMany({
      where: {
        adminId: +data.id
      },
      include: {
        products: true
      }
    })

    if(!catalogs) throw new NotFoundException()

    return {
      catalogs
    }
  }
  async addCategory(id : number, data : any) {
    const catalog = this.prisma.catalog.create({
      data: {
        name: data.name,
        adminId: +id,
      }
    })

    return catalog
  }
  async addProduct(id : number, data : any) {
    const product = this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        priceOne: data.priceOne,
        priceMany: data.priceMany,
        catalogId: data.catalogId,
        count: +data.count
      }
    })

    return product
  }
  async deleteCategory(data: product) {
    await this.prisma.product.delete({
      where: {id: +data.id}
    })

    const catalogs = await this.prisma.catalog.findUnique({
      where: {id: +data.catalogId},
      include: {products: true}
    })
    if(catalogs.products.length === 0) {
      await this.prisma.catalog.delete({
        where: {id: +data.catalogId}
      })
    }

    return {status: HttpStatus.OK, msg: `product with id: ${data} deleted`}
  }
}
