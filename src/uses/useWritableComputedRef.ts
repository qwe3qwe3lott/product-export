import { computed } from 'vue'
import { Mutations } from '@/store/mutations'
import store from '@/store'

export function useWritableComputedRef <M extends keyof Mutations, P extends Parameters<Mutations[M]>[1]> (getter: () => P, mutation: M, context?: unknown) {
  return computed<P>({
    get (): P { return getter.call(context ?? this) },
    set (newValue: P): void { store.commit(mutation, newValue) }
  })
}
