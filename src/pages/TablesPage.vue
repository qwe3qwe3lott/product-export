<template>
  <div class="filter-section">
    <h2 class="title">{{isTechnologyChosen ? chosenTechnology?.title : 'Technologies'}}</h2>
    <div class="filters">
      <DropdownUI :placeholder="'Country'" :value="chosenCountry" :data="countries" @change="chosenCountry = $event.target.value"/>
      <DropdownUI :placeholder="'Year'" :value="chosenYear" :data="years" @change="chosenYear = $event.target.value"/>
    </div>
  </div>
  <div class="alert-section" v-if="!isTechnologyChosen">
    <p class="alert-text">The “PRODUCTS” column shows how many manufactured export goods related with patented technology</p>
    <p class="alert-text" v-if="chosenCountry !== null && chosenYear !== null">There are <span :class="getCountOfTechnologiesWithProducts > 0 ? 'positive-mark' : 'negative-mark'">{{getCountOfTechnologiesWithProducts}}</span> technologies, which are being used to produce manufactured export in <span class="positive-mark">{{ chosenCountry }}</span> in <span class="positive-mark">{{ chosenYear }}</span></p>
  </div>
  <div class="alert-section" v-else>
    <button class="return-button" @click="getBackToTechnologies">
      <img class="return-button-image" alt="backArrow" src="@/assets/svg/arrow.svg">
      <p class="return-button-text">Return to technologies</p>
    </button>
  </div>
  <TableComponent class="table-section">
    <template v-slot:header>
      <TechnologiesHeaderComponent/>
    </template>
    <template v-slot:content>
      <TechnologiesContentComponent/>
    </template>
  </TableComponent>
</template>

<script lang="ts">
import { computed, defineComponent, WritableComputedRef, ComputedRef } from 'vue'
import DropdownUI from '@/components/UI/Dropdown.vue'
import { MutationTypes, useStore } from '@/store'
import { Technology } from '@/classes/Technology'
import TableComponent from '@/components/table/Table.vue'
import TechnologiesHeaderComponent from '@/components/table/TechnologiesHeader.vue'
import TechnologiesContentComponent from '@/components/table/TechnologiesContent.vue'

export default defineComponent({
  name: 'TablesPage',
  components: { TechnologiesContentComponent, TechnologiesHeaderComponent, TableComponent, DropdownUI },
  setup () {
    const store = useStore()

    const isTechnologyChosen: WritableComputedRef<boolean> = computed({
      get (): boolean { return store.state.isTechnologyChosen },
      set (newValue: boolean): void { store.commit(MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG, newValue) }
    })
    const chosenTechnology: WritableComputedRef<Technology | null> = computed({
      get (): Technology | null { return store.state.chosenTechnology },
      set (newValue: Technology | null): void { store.commit(MutationTypes.SET_CHOSEN_TECHNOLOGY, newValue) }
    })

    const chosenCountry: WritableComputedRef<string | null> = computed({
      get (): string | null { return store.state.chosenCountry },
      set (newValue: string | null): void { store.commit(MutationTypes.SET_CHOSEN_COUNTRY, newValue) }
    })
    const countries: ComputedRef<string[]> = computed(() => {
      return store.state.countries
    })

    const chosenYear: WritableComputedRef<string | null> = computed({
      get (): string | null { return store.state.chosenYear },
      set (newValue: string | null): void { store.commit(MutationTypes.SET_CHOSEN_YEAR, newValue) }
    })
    const years: ComputedRef<string[]> = computed(() => store.state.years)

    let fakeTechnologiesWithProducts = 15
    const technologiesWithProducts: WritableComputedRef<number> = computed({
      get (): number { return fakeTechnologiesWithProducts },
      set (newValue: number): void { fakeTechnologiesWithProducts = newValue }
    })

    const getBackToTechnologies = () => {
      isTechnologyChosen.value = false
    }

    const getCountOfTechnologiesWithProducts: ComputedRef<number> = computed(() => store.getters.getCountOfTechnologiesWithProducts)

    return {
      isTechnologyChosen,
      technologiesWithProducts,
      chosenTechnology,
      chosenCountry,
      countries,
      years,
      chosenYear,
      getBackToTechnologies,
      getCountOfTechnologiesWithProducts
    }
  }
})
</script>

<style scoped>
.filter-section {
  padding: 1.5em 2.5em 0.5em 2.5em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.title {
  font-size: 1.8em;
  color: var(--secondary-color);
}
.filters {
  display: flex;
  justify-content: space-between;
  gap: 0.5em;
  align-items: flex-end;
}
.alert-section {
  padding: 0 2.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.25em;
  align-items: flex-start;
}
.alert-text {
  font-size: 0.9em;
}
.positive-mark {
  color: var(--secondary-color);
}
.negative-mark {
  color: var(--secondary-opposite-color);
}
.return-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
}
.return-button-text {
  font-size: 0.9em;
}
.table-section {
  padding: 1em 2.5em 0 2.5em;
}
</style>
