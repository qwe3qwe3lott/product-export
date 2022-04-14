import { Technology } from '@/types/Technology'
import { MutationTree } from 'vuex'
import { RowsPerPage, State } from '@/store/state'
import { Product } from '@/types/Product'
import { SortEvent } from '@/types/events/SortEvent'
import { SortSetup } from '@/types/SortSetup'

export enum MutationTypes {
  SET_TECHNOLOGY_CHOSEN_FLAG = 'SET_TECHNOLOGY_CHOSEN_FLAG',
  SET_CHOSEN_TECHNOLOGY = 'SET_CHOSEN_TECHNOLOGY',
  SET_CHOSEN_COUNTRY = 'SET_CHOSEN_COUNTRY',
  SET_CHOSEN_YEAR = 'SET_CHOSEN_YEAR',
  SET_YEARS_LIST = 'SET_YEARS_LIST',
  SET_COUNTRIES_LIST = 'SET_COUNTRIES_LIST',
  SET_TECHNOLOGIES_LIST = 'SET_TECHNOLOGIES_LIST',
  SORT_TECHNOLOGIES_LIST = 'SORT_TECHNOLOGIES_LIST',
  SET_ROWS_PER_TECHNOLOGIES_PAGE = 'SET_ROWS_PER_TECHNOLOGIES_PAGE',
  SET_CURRENT_TECHNOLOGIES_PAGE = 'SET_CURRENT_TECHNOLOGIES_PAGE',
  SET_TECHNOLOGIES_SORT_SETUP = 'SET_TECHNOLOGIES_SORT_SETUP',
  SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST',
  SORT_PRODUCTS_LIST = 'SORT_PRODUCTS_LIST',
  SET_ROWS_PER_PRODUCTS_PAGE = 'SET_ROWS_PER_PRODUCTS_PAGE',
  SET_CURRENT_PRODUCTS_PAGE = 'SET_CURRENT_PRODUCTS_PAGE',
  SET_PRODUCTS_SORT_SETUP = 'SET_PRODUCTS_SORT_SETUP'
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG](state: S, payload: boolean): void
  [MutationTypes.SET_CHOSEN_TECHNOLOGY](state: S, payload: Technology | null): void
  [MutationTypes.SET_CHOSEN_COUNTRY](state: S, payload: string | null): void
  [MutationTypes.SET_CHOSEN_YEAR](state: S, payload: string | null): void
  [MutationTypes.SET_YEARS_LIST](state: S, payload: string[]): void
  [MutationTypes.SET_COUNTRIES_LIST](state: S, payload: string[]): void
  [MutationTypes.SET_TECHNOLOGIES_LIST](state: S, payload: Technology[]): void
  [MutationTypes.SORT_TECHNOLOGIES_LIST](state: S, payload: SortEvent<Technology>): void
  [MutationTypes.SET_ROWS_PER_TECHNOLOGIES_PAGE](state: S, payload: RowsPerPage): void
  [MutationTypes.SET_CURRENT_TECHNOLOGIES_PAGE](state: S, payload: number): void
  [MutationTypes.SET_TECHNOLOGIES_SORT_SETUP](state: S, payload: SortSetup<Technology>): void
  [MutationTypes.SET_PRODUCTS_LIST](state: S, payload: Product[]): void
  [MutationTypes.SORT_PRODUCTS_LIST](state: S, payload: SortEvent<Product>): void
  [MutationTypes.SET_ROWS_PER_PRODUCTS_PAGE](state: S, payload: RowsPerPage): void
  [MutationTypes.SET_CURRENT_PRODUCTS_PAGE](state: S, payload: number): void
  [MutationTypes.SET_PRODUCTS_SORT_SETUP](state: S, payload: SortSetup<Product>): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG] (state, payload) { state.isTechnologyChosen = payload },
  [MutationTypes.SET_CHOSEN_TECHNOLOGY] (state, payload) { state.chosenTechnology = payload },
  [MutationTypes.SET_CHOSEN_COUNTRY] (state, payload) { state.chosenCountry = payload },
  [MutationTypes.SET_CHOSEN_YEAR] (state, payload) { state.chosenYear = payload },
  [MutationTypes.SET_YEARS_LIST] (state, payload) { state.years = payload },
  [MutationTypes.SET_COUNTRIES_LIST] (state, payload) { state.countries = payload },
  [MutationTypes.SET_TECHNOLOGIES_LIST] (state, payload) { state.technologies = payload },
  [MutationTypes.SORT_TECHNOLOGIES_LIST] (state, payload) {
    if (state.technologies.length < 1) return
    const isNumber = typeof state.technologies[0][payload.key] === 'number'
    const isString = typeof state.technologies[0][payload.key] === 'string'
    const isArray = Array.isArray(state.technologies[0][payload.key])
    state.technologies = state.technologies.sort((a, b) => {
      if (isNumber) {
        const c = a[payload.key] as number
        const d = b[payload.key] as number
        return payload.sortAtoZ ? c - d : d - c
      }
      if (isString) {
        const c = a[payload.key] as string
        const d = b[payload.key] as string
        if (c < d) return payload.sortAtoZ ? -1 : 1
        if (d < c) return payload.sortAtoZ ? 1 : -1
        return 0
      }
      if (isArray) {
        const c = (a[payload.key] as Array<unknown>).length
        const d = (b[payload.key] as Array<unknown>).length
        return payload.sortAtoZ ? c - d : d - c
      }
      return 0
    })
  },
  [MutationTypes.SET_ROWS_PER_TECHNOLOGIES_PAGE] (state, payload) {
    state.rowsPerTechnologiesPage = payload
    state.currentTechnologiesPage = 1
  },
  [MutationTypes.SET_CURRENT_TECHNOLOGIES_PAGE] (state, payload) {
    if (payload < 1) return
    const totalRows: number = state.technologies.length
    const totalPages: number = Math.ceil(totalRows / state.rowsPerTechnologiesPage)
    if (payload > totalPages) return
    state.currentTechnologiesPage = payload
  },
  [MutationTypes.SET_TECHNOLOGIES_SORT_SETUP] (state, payload) { state.technologiesSortSetup = payload },
  [MutationTypes.SET_PRODUCTS_LIST] (state, payload) { state.products = payload },
  [MutationTypes.SORT_PRODUCTS_LIST] (state, payload) {
    if (state.products.length < 1) return
    const isNumber = typeof state.products[0][payload.key] === 'number'
    const isString = typeof state.products[0][payload.key] === 'string'
    state.products = state.products.sort((a, b) => {
      if (isNumber) {
        const c = a[payload.key] as number
        const d = b[payload.key] as number
        return payload.sortAtoZ ? c - d : d - c
      }
      if (isString) {
        const c = a[payload.key] as string
        const d = b[payload.key] as string
        if (c < d) return payload.sortAtoZ ? -1 : 1
        if (d < c) return payload.sortAtoZ ? 1 : -1
        return 0
      }
      return 0
    })
  },
  [MutationTypes.SET_ROWS_PER_PRODUCTS_PAGE] (state, payload) {
    state.rowsPerProductsPage = payload
    state.currentProductsPage = 1
  },
  [MutationTypes.SET_CURRENT_PRODUCTS_PAGE] (state, payload) {
    if (payload < 1) return
    const totalRows: number = state.products.length
    const totalPages: number = Math.ceil(totalRows / state.rowsPerProductsPage)
    if (payload > totalPages) return
    state.currentProductsPage = payload
  },
  [MutationTypes.SET_PRODUCTS_SORT_SETUP] (state, payload) { state.productsSortSetup = payload }
}
