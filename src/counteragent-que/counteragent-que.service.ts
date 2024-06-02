import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BuyProductsDto } from './dto';

@Injectable()
export class CounteragentQueService {
  constructor(private prisma : PrismaService) {}

  async GetAdminNameAndProducts(adminId : any) {
    const admin = await this.prisma.admin.findUnique({
      where: {id: +adminId.id},
    })

    if(!admin) throw new NotFoundException('admin not found')

    const products = await this.prisma.catalog.findMany({
      where: {
        adminId: +admin.id
      },
      include: {
        products: true
      }
    })

    return {
      adminName: admin.login,
      catalogs: products
    }
  }
  async BuyProducts(data : BuyProductsDto) {
    const products = []

    for(let i = 0; i < data.product.length; i++) {
      const curr = await this.prisma.product.findFirst({
        where: {id: data.product[i].id},
        select: {count: true}
      })
      
      await this.prisma.product.update({
        where: {id: +data.product[i].id},
        data: {count: curr.count - data.product[0].count}
      })
    }

    for(let i = 0; i < data.product.length; i++) {
      products.push(data.product[i].id) // Нечетное число id продукта
      products.push(data.product[i].count) // Четной его количество
    }
    const subtotal = Math.round((countSub(data.product) + Math.round(countSub(data.product) * 0.10)) * 1.13)

    const res = await this.prisma.orderStatus.create({
      data: {
        subtotal: subtotal,
        adminId: data.adminId,
        counterAgentId: data.agentId,
        cvvCard: data.credentials.cvv_card,
        dateCard: data.credentials.date_card,
        nameCard: data.credentials.name_card,
        numberCard: data.credentials.number_card,
        date: new Date().toISOString().slice(0, 10),
        productIdAndCount: products,
        status: 'send'
      }
    })
    await this.prisma.statistic.create({
      data: {
        adminId: data.adminId,
        incomes: subtotal.toString(),
        expenses: (subtotal * 0.5).toString(),
        products: products,
        counterAgentId: data.agentId
      }
    })

    return {status: HttpStatus.OK, data: res}
  }
}

const countSub = (products) => {
  let subtotal = 0
  for(let i = 0; i < products.length; i++) {
    subtotal += Number.parseInt(products[i].priceOne) * products[i].count
    if(products[i].count >= 10) {
      subtotal *= 1 - Number.parseInt(products[i].priceMany) / 100
    }
  }
  return subtotal 
}