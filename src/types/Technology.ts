import { Product } from '@/types/Product'

export type Technology = {
  id: number,
  title: string,
  indexValue: number,
  products: Product[],
}
