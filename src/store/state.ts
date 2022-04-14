import { Technology } from '@/types/Technology'
import { Product } from '@/types/Product'
import { SortSetup } from '@/types/SortSetup'

export enum RowsPerPage {
  few = 25,
  some = 50,
  several = 75,
  many = 100
}

export type State = {
  isTechnologyChosen: boolean
  chosenTechnology: Technology | null

  countries: string[]
  years: string[]
  chosenCountry: string | null
  chosenYear: string | null

  technologies: Technology[]
  rowsPerTechnologiesPage: RowsPerPage,
  currentTechnologiesPage: number,
  technologiesSortSetup: SortSetup<Technology>

  products: Product[]
  rowsPerProductsPage: RowsPerPage,
  currentProductsPage: number,
  productsSortSetup: SortSetup<Product>
}

export const state: State = {
  chosenCountry: null,
  chosenTechnology: null,
  chosenYear: null,
  countries: [],
  isTechnologyChosen: false,
  years: [],
  technologies: [],
  products: [],
  rowsPerTechnologiesPage: RowsPerPage.few,
  rowsPerProductsPage: RowsPerPage.few,
  currentTechnologiesPage: 1,
  currentProductsPage: 1,
  technologiesSortSetup: { property: 'indexValue', sortAtoZ: false },
  productsSortSetup: { property: 'title', sortAtoZ: true }
}
