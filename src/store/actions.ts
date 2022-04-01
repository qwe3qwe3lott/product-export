import { ActionContext, ActionTree } from 'vuex'
import { State } from '@/store/state'
import { Mutations, MutationTypes } from '@/store/mutations'
import { delay } from '@/util/delay'
import { apiService } from '@/api/service'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionTypes {
  LOAD_YEARS_LIST = 'LOAD_YEARS_LIST',
  LOAD_COUNTRIES_LIST = 'LOAD_COUNTRIES_LIST',
  LOAD_TECHNOLOGIES_LIST = 'LOAD_TECHNOLOGIES_LIST'
}

export interface Actions {
  [ActionTypes.LOAD_YEARS_LIST]({ commit }: AugmentedActionContext): void
  [ActionTypes.LOAD_COUNTRIES_LIST]({ commit }: AugmentedActionContext): void
  [ActionTypes.LOAD_TECHNOLOGIES_LIST]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.LOAD_YEARS_LIST] ({ commit }: AugmentedActionContext) {
    commit(MutationTypes.SET_YEARS_LIST, await apiService.getYearsList())
  },
  async [ActionTypes.LOAD_COUNTRIES_LIST] ({ commit }: AugmentedActionContext) {
    commit(MutationTypes.SET_COUNTRIES_LIST, await apiService.getCountriesList())
  },
  async [ActionTypes.LOAD_TECHNOLOGIES_LIST] ({ commit }: AugmentedActionContext) {
    await delay(500)
    commit(MutationTypes.SET_TECHNOLOGIES_LIST, [
      {
        id: 1,
        title: 'Chemical reaction',
        indexValue: 23.233,
        products: [
          { id: 1, title: 'Сера' },
          { id: 2, title: 'Водород' }
        ]
      },
      {
        id: 2,
        title: 'Chemical something',
        indexValue: 23.233,
        products: [
          { id: 1, title: 'Сера' }
        ]
      },
      {
        id: 3,
        title: 'Cake baking',
        indexValue: 13.233,
        products: []
      }
    ].concat(Array(100).fill({
      id: 1,
      title: 'Chemical reaction',
      indexValue: 23.233,
      products: [
        { id: 1, title: 'Сера' },
        { id: 2, title: 'Водород' }
      ]
    })))
  }
}
