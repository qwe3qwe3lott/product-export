import { GetterTree } from 'vuex'
import { State } from '@/store/state'
import { Technology } from '@/types/Technology'

export type Getters = {
  getCountOfTechnologiesWithProducts (state: State): number,
  // Technologies which displays at the current page
  getCurrentTechnologies (state: State): Technology[],
  // Info which displays under table left
  getCurrentTechnologiesPageInfo (state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
  getCountOfTechnologiesWithProducts: state => state.technologies.filter(technology => technology.products.length > 0).length,
  getCurrentTechnologies: state => {
    const endIndex: number = state.currentTechnologiesPage * state.rowsPerTechnologiesPage
    return state.technologies.slice(endIndex - state.rowsPerTechnologiesPage, endIndex)
  },
  getCurrentTechnologiesPageInfo: state => {
    const totalRows: number = state.technologies.length
    if (totalRows === 0) return ''
    const currentPage: number = state.currentTechnologiesPage
    const totalPages: number = Math.ceil(totalRows / state.rowsPerTechnologiesPage)
    const isThisLastPage: boolean = currentPage === totalPages
    let lastPageRows: number = totalRows % state.rowsPerTechnologiesPage
    if (lastPageRows === 0) lastPageRows = state.rowsPerTechnologiesPage

    const lastRowOnCurrentPage: number = isThisLastPage ? totalRows : currentPage * state.rowsPerTechnologiesPage
    const firstRowOnCurrentPage: number = lastRowOnCurrentPage - (isThisLastPage ? lastPageRows : state.rowsPerTechnologiesPage) + 1
    return `${firstRowOnCurrentPage}-${lastRowOnCurrentPage} of ${totalRows}`
  }
}
