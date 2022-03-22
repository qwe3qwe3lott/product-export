import {
  ActionContext,
  ActionTree,
  CommitOptions,
  createStore,
  DispatchOptions,
  GetterTree,
  MutationTree,
  Store as VuexStore
} from 'vuex'
import { Technology } from '@/classes/Technology'

export type State = {
  isTechnologyChosen: boolean,
  chosenTechnology: Technology | null,
  countries: string[],
  years: string[],
  chosenCountry: string | null,
  chosenYear: string | null,
  technologies: Technology[]
}

const state: State = {
  chosenCountry: null,
  chosenTechnology: null,
  chosenYear: null,
  countries: ['Albania', 'USA'],
  isTechnologyChosen: false,
  years: ['2021', '2022'],
  technologies: []
}

export enum MutationTypes {
  SET_TECHNOLOGY_CHOSEN_FLAG = 'SET_TECHNOLOGY_CHOSEN_FLAG',
  SET_CHOSEN_TECHNOLOGY = 'SET_CHOSEN_TECHNOLOGY',
  SET_CHOSEN_COUNTRY = 'SET_CHOSEN_COUNTRY',
  SET_CHOSEN_YEAR = 'SET_CHOSEN_YEAR'
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG](state: S, payload: boolean): void,
  [MutationTypes.SET_CHOSEN_TECHNOLOGY](state: S, payload: Technology | null): void
  [MutationTypes.SET_CHOSEN_COUNTRY](state: S, payload: string | null): void
  [MutationTypes.SET_CHOSEN_YEAR](state: S, payload: string | null): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG] (state: State, payload: boolean) { state.isTechnologyChosen = payload },
  [MutationTypes.SET_CHOSEN_TECHNOLOGY] (state: State, payload: Technology | null) { state.chosenTechnology = payload },
  [MutationTypes.SET_CHOSEN_COUNTRY] (state: State, payload: string | null) { state.chosenCountry = payload },
  [MutationTypes.SET_CHOSEN_YEAR] (state: State, payload: string | null) { state.chosenYear = payload }
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionTypes {
  SET_TECHNOLOGY_CHOSEN_FLAG = 'SET_TECHNOLOGY_CHOSEN_FLAG'
}

export interface Actions {
  [ActionTypes.SET_TECHNOLOGY_CHOSEN_FLAG]({ commit }: AugmentedActionContext, payload: boolean): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SET_TECHNOLOGY_CHOSEN_FLAG] ({ commit }, payload: boolean) {
    commit(MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG, payload)
  }
}

export type Getters = {
  getCountOfTechnologiesWithProducts (state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
  getCountOfTechnologiesWithProducts: state => {
    return state.technologies.length
  }
}

export type Store = Omit<VuexStore<State>, 'commit' | 'getters' | 'dispatch'>
  & { commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(key: K, payload: P, options?: CommitOptions): ReturnType<Mutations[K]> }
  & { getters: { [K in keyof Getters]: ReturnType<Getters[K]> } }
  & { dispatch<K extends keyof Actions>(key: K, payload: Parameters<Actions[K]>[1], options?: DispatchOptions): ReturnType<Actions[K]> }

const store: Store = createStore<State>({
  state,
  mutations,
  getters,
  actions
})

export function useStore (): Store { return store as Store }

export default store
