import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore
} from 'vuex'
import { state, State } from '@/store/state'
import { mutations, Mutations } from '@/store/mutations'
import { actions, Actions } from '@/store/actions'
import { getters, Getters } from '@/store/getters'

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
