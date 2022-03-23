import { GetterTree } from 'vuex'
import { State } from '@/store/state'

export type Getters = {
  getCountOfTechnologiesWithProducts (state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
  getCountOfTechnologiesWithProducts: state => {
    return state.technologies.length
  }
}
