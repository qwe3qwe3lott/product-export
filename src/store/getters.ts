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
  // Info which displays under technologies table left
  getTechnologiesCurrentPageInfo (state: State): string,
  // Info which displays under products table left
  getProductsCurrentPageInfo (state: State): string,
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
  getTechnologiesCurrentPageInfo: state => getCurrentPageInfo(state.technologies.length, state.currentTechnologiesPage, state.rowsPerTechnologiesPage),
  getProductsCurrentPageInfo: state => getCurrentPageInfo(state.products.length, state.currentProductsPage, state.rowsPerProductsPage)
}

const getCurrentPageInfo = (totalRows: number, currentPage: number, rowsPerPage: number): string => {
  if (totalRows === 0) return ''
  const totalPages: number = Math.ceil(totalRows / rowsPerPage)
  const isThisLastPage: boolean = currentPage === totalPages
  let lastPageRows: number = totalRows % rowsPerPage
  if (lastPageRows === 0) lastPageRows = rowsPerPage

  const lastRowOnCurrentPage: number = isThisLastPage ? totalRows : currentPage * rowsPerPage
  const firstRowOnCurrentPage: number = lastRowOnCurrentPage - (isThisLastPage ? lastPageRows : rowsPerPage) + 1
  return `${firstRowOnCurrentPage}-${lastRowOnCurrentPage} of ${totalRows}`
}
