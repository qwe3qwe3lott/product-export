import { GetterTree } from 'vuex'
import { State } from '@/store/state'
import { Technology } from '@/types/Technology'
import { Product } from '@/types/Product'

export type Getters = {
  // How many technologies belong to products
  getCountOfTechnologiesWithProducts (state: State): number,
  // Technologies which displays at the current page
  getCurrentTechnologies (state: State): Technology[],
  // Products which displays at the current page
  getCurrentProducts (state: State): Product[],
  getCountOfTechnologies (state: State): number,
  getCountOfProducts (state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
  getCountOfTechnologiesWithProducts: state => state.technologies.filter(technology => technology.products.length > 0).length,
  getCurrentTechnologies: state => {
    const endIndex: number = state.currentTechnologiesPage * state.rowsPerTechnologiesPage
    return state.technologies.slice(endIndex - state.rowsPerTechnologiesPage, endIndex)
  },
  getCurrentProducts: state => {
    const endIndex: number = state.currentProductsPage * state.rowsPerProductsPage
    return state.products.slice(endIndex - state.rowsPerProductsPage, endIndex)
  },
  getCountOfTechnologies: state => state.technologies.length,
  getCountOfProducts: state => state.products.length
}
