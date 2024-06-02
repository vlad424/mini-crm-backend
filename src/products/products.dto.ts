export class GetCatalogsType {
  id: number
}
export class AddCatalogAction {
  adminId: number
  data: Catalog
  action: string
}
export class Catalog {
  id: number
  adminId: number
  name: string
  products: Array<product> | null
}
export class product {
  id: number
  catalogId: number
  description: string
  name: string
  priceOne: number
  priceMany: number // > 10
}
export class AddProductAction {
  adminId: number
  data: product
  action: string
}