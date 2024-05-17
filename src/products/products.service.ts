import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCatalogsType } from './products.dto';

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
}
