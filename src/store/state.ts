import { Technology } from '@/types/Technology'

export enum RowsPerPage {
  few = 1,
  some = 2,
  several = 3,
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
  rowsPerProductsPage: RowsPerPage,
  currentTechnologiesPage: number,
  currentProductsPage: number
}

export const state: State = {
  chosenCountry: null,
  chosenTechnology: null,
  chosenYear: null,
  countries: [],
  isTechnologyChosen: false,
  years: [],
  technologies: [],
  rowsPerTechnologiesPage: RowsPerPage.few,
  rowsPerProductsPage: RowsPerPage.few,
  currentTechnologiesPage: 1,
  currentProductsPage: 1
}
