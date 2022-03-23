import { Technology } from '@/types/Technology'
import { MutationTree } from 'vuex'
import { State } from '@/store/state'

export enum MutationTypes {
  SET_TECHNOLOGY_CHOSEN_FLAG = 'SET_TECHNOLOGY_CHOSEN_FLAG',
  SET_CHOSEN_TECHNOLOGY = 'SET_CHOSEN_TECHNOLOGY',
  SET_CHOSEN_COUNTRY = 'SET_CHOSEN_COUNTRY',
  SET_CHOSEN_YEAR = 'SET_CHOSEN_YEAR',
  SET_YEARS_LIST = 'SET_YEARS_LIST',
  SET_COUNTRIES_LIST = 'SET_COUNTRIES_LIST',
  SET_TECHNOLOGIES_LIST = 'SET_TECHNOLOGIES_LIST'
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG](state: S, payload: boolean): void
  [MutationTypes.SET_CHOSEN_TECHNOLOGY](state: S, payload: Technology | null): void
  [MutationTypes.SET_CHOSEN_COUNTRY](state: S, payload: string | null): void
  [MutationTypes.SET_CHOSEN_YEAR](state: S, payload: string | null): void
  [MutationTypes.SET_YEARS_LIST](state: S, payload: string[]): void
  [MutationTypes.SET_COUNTRIES_LIST](state: S, payload: string[]): void
  [MutationTypes.SET_TECHNOLOGIES_LIST](state: S, payload: Technology[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG] (state: State, payload: boolean) { state.isTechnologyChosen = payload },
  [MutationTypes.SET_CHOSEN_TECHNOLOGY] (state: State, payload: Technology | null) { state.chosenTechnology = payload },
  [MutationTypes.SET_CHOSEN_COUNTRY] (state: State, payload: string | null) { state.chosenCountry = payload },
  [MutationTypes.SET_CHOSEN_YEAR] (state: State, payload: string | null) { state.chosenYear = payload },
  [MutationTypes.SET_YEARS_LIST] (state: State, payload: string[]) { state.years = payload },
  [MutationTypes.SET_COUNTRIES_LIST] (state: State, payload: string[]) { state.countries = payload },
  [MutationTypes.SET_TECHNOLOGIES_LIST] (state: State, payload: Technology[]) { state.technologies = payload }
}
