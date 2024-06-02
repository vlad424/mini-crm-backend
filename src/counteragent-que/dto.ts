export class BuyProductsDto {
  product: [
    {
      id: number,
      name: string,
      description: string,
      priceOne: string,
      priceMany: string,
      catalogId: number,
      count: number
    }
  ]
  credentials: {
    name_card: string,
    number_card: string,
    date_card: string,
    cvv_card: string
  }
  agentId: number
  adminId: number
}