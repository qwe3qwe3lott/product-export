<template>
  <div class="filter-section">
    <h2 class="title">{{isTechnologyChosen ? chosenTechnology?.title : 'Technologies'}}</h2>
    <div class="filters">
      <DropdownUI :placeholder="'Country'" :value="chosenCountry" :data="countries" @change="countryWasChanged"/>
      <DropdownUI :placeholder="'Year'" :value="chosenYear" :data="years" @change="yearWasChanged"/>
    </div>
  </div>
  <div class="alert-section" v-if="!isTechnologyChosen">
    <p class="alert-text">The “PRODUCTS” column shows how many manufactured export goods related with patented technology</p>
    <p class="alert-text" v-if="yearAndCountryHaveChosen">There are <span :class="getCountOfTechnologiesWithProducts > 0 ? 'positive-mark' : 'negative-mark'">{{getCountOfTechnologiesWithProducts}}</span> technologies, which are being used to produce manufactured export in <span class="positive-mark">{{ chosenCountry }}</span> in <span class="positive-mark">{{ chosenYear }}</span></p>
  </div>
  <div class="alert-section" v-else>
    <button class="return-button" @click="getBackToTechnologies">
      <img class="return-button-image" alt="backArrow" src="@/assets/svg/arrow.svg">
      <p class="return-button-text">Return to technologies</p>
    </button>
  </div>
  <TableComponent class="table-section">
    <template v-slot:header>
      <TableHeaderComponent :columns-setup="technologiesColumnsSetup" @sort="sortTechnologies"/>
    </template>
    <template v-slot:content>
      <TableContentComponent/>
    </template>
  </TableComponent>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, WritableComputedRef } from 'vue'
import DropdownUI from '@/components/UI/Dropdown.vue'
import { useStore } from '@/store'
import { Technology } from '@/types/Technology'
import TableComponent from '@/components/table/Table.vue'
import TableHeaderComponent from '@/components/table/TableHeader.vue'
import TableContentComponent from '@/components/table/TableContent.vue'
import { MutationTypes } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'
import { ColumnSetup, ColumnWidthMetrics } from '@/types/ColumnSetup'
import { SortEvent } from '@/types/events/SortEvent'

export default defineComponent({
  name: 'TablesPage',
  components: { TableContentComponent, TableHeaderComponent, TableComponent, DropdownUI },
  setup () {
    const store = useStore()

    if (store.state.countries.length === 0) store.dispatch(ActionTypes.LOAD_COUNTRIES_LIST, undefined)
    if (store.state.years.length === 0) store.dispatch(ActionTypes.LOAD_YEARS_LIST, undefined)

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
    const countries: ComputedRef<string[]> = computed(() => store.state.countries)
    const countryWasChanged = (event: Event) => {
      chosenCountry.value = (event.target as HTMLSelectElement).value
    }

    const chosenYear: WritableComputedRef<string | null> = computed({
      get (): string | null { return store.state.chosenYear },
      set (newValue: string | null): void { store.commit(MutationTypes.SET_CHOSEN_YEAR, newValue) }
    })
    const years: ComputedRef<string[]> = computed(() => store.state.years)
    const yearWasChanged = (event: Event) => {
      chosenYear.value = (event.target as HTMLSelectElement).value
    }

    // ALERT SECTION
    const getBackToTechnologies = () => { isTechnologyChosen.value = false }
    const yearAndCountryHaveChosen: ComputedRef<boolean> = computed(() => chosenYear.value !== null && chosenCountry.value !== null)
    const getCountOfTechnologiesWithProducts: ComputedRef<number> = computed(() => store.getters.getCountOfTechnologiesWithProducts)

    // TECHNOLOGIES TABLE SETUP
    const technologiesColumnsSetup: ColumnSetup[] = [
      { title: 'Technology title' },
      { title: 'Index value', width: { value: 12, metric: ColumnWidthMetrics.em }, sortAtoZ: false },
      { title: 'Products', width: { value: 7.5, metric: ColumnWidthMetrics.em } }
    ]
    const sortTechnologies = (event: SortEvent) => {
      console.log(event)
    }

    return {
      isTechnologyChosen,
      chosenTechnology,
      chosenCountry,
      countries,
      countryWasChanged,
      years,
      chosenYear,
      yearWasChanged,
      getBackToTechnologies,
      getCountOfTechnologiesWithProducts,
      yearAndCountryHaveChosen,
      technologiesColumnsSetup,
      sortTechnologies,
      test: () => { console.log('test') }
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
