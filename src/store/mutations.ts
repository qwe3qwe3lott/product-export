import { Technology } from '@/types/Technology'
import { MutationTree } from 'vuex'
import { RowsPerPage, State } from '@/store/state'

export enum MutationTypes {
  SET_TECHNOLOGY_CHOSEN_FLAG = 'SET_TECHNOLOGY_CHOSEN_FLAG',
  SET_CHOSEN_TECHNOLOGY = 'SET_CHOSEN_TECHNOLOGY',
  SET_CHOSEN_COUNTRY = 'SET_CHOSEN_COUNTRY',
  SET_CHOSEN_YEAR = 'SET_CHOSEN_YEAR',
  SET_YEARS_LIST = 'SET_YEARS_LIST',
  SET_COUNTRIES_LIST = 'SET_COUNTRIES_LIST',
  SET_TECHNOLOGIES_LIST = 'SET_TECHNOLOGIES_LIST',
  SET_ROWS_PER_TECHNOLOGIES_PAGE = 'SET_ROWS_PER_TECHNOLOGIES_PAGE',
  SET_CURRENT_TECHNOLOGIES_PAGE = 'SET_CURRENT_TECHNOLOGIES_PAGE'
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG](state: S, payload: boolean): void
  [MutationTypes.SET_CHOSEN_TECHNOLOGY](state: S, payload: Technology | null): void
  [MutationTypes.SET_CHOSEN_COUNTRY](state: S, payload: string | null): void
  [MutationTypes.SET_CHOSEN_YEAR](state: S, payload: string | null): void
  [MutationTypes.SET_YEARS_LIST](state: S, payload: string[]): void
  [MutationTypes.SET_COUNTRIES_LIST](state: S, payload: string[]): void
  [MutationTypes.SET_TECHNOLOGIES_LIST](state: S, payload: Technology[]): void
  [MutationTypes.SET_ROWS_PER_TECHNOLOGIES_PAGE](state: S, payload: RowsPerPage): void
  [MutationTypes.SET_CURRENT_TECHNOLOGIES_PAGE](state: S, payload: number): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG] (state: State, payload: boolean) { state.isTechnologyChosen = payload },
  [MutationTypes.SET_CHOSEN_TECHNOLOGY] (state: State, payload: Technology | null) { state.chosenTechnology = payload },
  [MutationTypes.SET_CHOSEN_COUNTRY] (state: State, payload: string | null) { state.chosenCountry = payload },
  [MutationTypes.SET_CHOSEN_YEAR] (state: State, payload: string | null) { state.chosenYear = payload },
  [MutationTypes.SET_YEARS_LIST] (state: State, payload: string[]) { state.years = payload },
  [MutationTypes.SET_COUNTRIES_LIST] (state: State, payload: string[]) { state.countries = payload },
  [MutationTypes.SET_TECHNOLOGIES_LIST] (state: State, payload: Technology[]) { state.technologies = payload },
  [MutationTypes.SET_ROWS_PER_TECHNOLOGIES_PAGE] (state: State, payload: RowsPerPage) {
    state.rowsPerTechnologiesPage = payload
    state.currentTechnologiesPage = 1
  },
  [MutationTypes.SET_CURRENT_TECHNOLOGIES_PAGE] (state: State, payload: number) {
    if (payload < 1) return
    const totalRows: number = state.technologies.length
    const totalPages: number = Math.ceil(totalRows / state.rowsPerTechnologiesPage)
    if (payload > totalPages) return
    state.currentTechnologiesPage = payload
  }
}
