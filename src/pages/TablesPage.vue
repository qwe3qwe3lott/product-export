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
      <span class="return-button-text">Return to technologies</span>
    </button>
  </div>
  <TableComponent class="table-section" v-if="!isTechnologyChosen" :rows-per-page="rowsPerTechnologiesPage" :page-info="technologiesCurrentPageInfo" @rowsPerPageChange="changeRowsPerTechnologiesPage" @nextPage="openNextTechnologiesPage" @previousPage="openPreviousTechnologiesPage">
    <template v-slot:header>
      <TableHeaderComponent :columns-setup="technologiesColumnsSetup" @sort="sortTechnologies"/>
    </template>
    <template v-slot:content>
      <TableContentComponent :columns-setup="technologiesColumnsSetup" :data="technologiesOnPage" :clickable="true" @rowClick="clickOnTechnologyRow"/>
    </template>
  </TableComponent>
  <TableComponent class="table-section" v-else :rows-per-page="rowsPerProductsPage" :page-info="productsCurrentPageInfo" @rowsPerPageChange="changeRowsPerProductsPage" @nextPage="openNextProductsPage" @previousPage="openPreviousProductsPage">
    <template v-slot:header>
      <TableHeaderComponent :columns-setup="productsColumnsSetup" @sort="sortProducts"/>
    </template>
    <template v-slot:content>
      <TableContentComponent :columns-setup="productsColumnsSetup" :data="productsOnPage" :clickable="false"/>
    </template>
  </TableComponent>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
import { RowClickEvent } from '@/types/events/RowClickEvent'
import { useWritableComputedRef } from '@/uses/useWritableComputedRef'

export default defineComponent({
  name: 'TablesPage',
  components: { TableContentComponent, TableHeaderComponent, TableComponent, DropdownUI },
  setup () {
    const store = useStore()

    if (store.state.countries.length === 0) store.dispatch(ActionTypes.LOAD_COUNTRIES_LIST, undefined)
    if (store.state.years.length === 0) store.dispatch(ActionTypes.LOAD_YEARS_LIST, undefined)

    const isTechnologyChosen = useWritableComputedRef(() => store.state.isTechnologyChosen, MutationTypes.SET_TECHNOLOGY_CHOSEN_FLAG)
    const chosenTechnology = useWritableComputedRef(() => store.state.chosenTechnology, MutationTypes.SET_CHOSEN_TECHNOLOGY)

    const chosenCountry = useWritableComputedRef(() => store.state.chosenCountry, MutationTypes.SET_CHOSEN_COUNTRY)
    const countries = computed(() => store.state.countries)
    const countryWasChanged = (event: Event) => {
      chosenCountry.value = (event.target as HTMLSelectElement).value
      loadTechnologies()
    }

    const chosenYear = useWritableComputedRef(() => store.state.chosenYear, MutationTypes.SET_CHOSEN_YEAR)
    const years = computed(() => store.state.years)
    const yearWasChanged = (event: Event) => {
      chosenYear.value = (event.target as HTMLSelectElement).value
      loadTechnologies()
    }

    const loadTechnologies = async () => {
      if (chosenCountry.value === null || chosenYear.value === null) return
      await store.dispatch(ActionTypes.LOAD_TECHNOLOGIES_LIST, undefined)
      currentTechnologiesPage.value = 1
    }

    // ALERT SECTION
    const getBackToTechnologies = () => { isTechnologyChosen.value = false }
    const yearAndCountryHaveChosen = computed(() => chosenYear.value !== null && chosenCountry.value !== null)
    const getCountOfTechnologiesWithProducts = computed(() => store.getters.getCountOfTechnologiesWithProducts)

    // TECHNOLOGIES TABLE SETUP
    const technologiesOnPage = computed(() => store.getters.getCurrentTechnologies)
    const technologiesColumnsSetup: ColumnSetup[] = [
      { title: 'Technology title', property: 'title' },
      { title: 'Index value', property: 'indexValue', width: { value: 12, metric: ColumnWidthMetrics.em }, sortAtoZ: false },
      { title: 'Products', property: 'products', width: { value: 7.5, metric: ColumnWidthMetrics.em } }
    ]
    const clickOnTechnologyRow = (event: RowClickEvent) => {
      const technology: Technology = event.element
      if (technology.products.length > 0) {
        chosenTechnology.value = technology
        store.commit(MutationTypes.SET_PRODUCTS_LIST, technology.products)
        isTechnologyChosen.value = true
      } else console.log('Открыть модальное окно')
    }
    const technologiesCurrentPageInfo = computed(() => store.getters.getTechnologiesCurrentPageInfo)
    const rowsPerTechnologiesPage = useWritableComputedRef(() => store.state.rowsPerTechnologiesPage, MutationTypes.SET_ROWS_PER_TECHNOLOGIES_PAGE)
    const changeRowsPerTechnologiesPage = (event: Event) => {
      rowsPerTechnologiesPage.value = +(event.target as HTMLSelectElement).value
    }
    const currentTechnologiesPage = useWritableComputedRef(() => store.state.currentTechnologiesPage, MutationTypes.SET_CURRENT_TECHNOLOGIES_PAGE)
    const openPreviousTechnologiesPage = () => { currentTechnologiesPage.value-- }
    const openNextTechnologiesPage = () => { currentTechnologiesPage.value++ }
    const sortTechnologies = (event: SortEvent) => {
      console.log(event)
    }

    // PRODUCTS TABLE SETUP
    const productsOnPage = computed(() => store.getters.getCurrentProducts)
    const productsColumnsSetup: ColumnSetup[] = [
      { title: 'Product title', property: 'title', sortAtoZ: true }
    ]
    const productsCurrentPageInfo = computed(() => store.getters.getProductsCurrentPageInfo)
    const rowsPerProductsPage = useWritableComputedRef(() => store.state.rowsPerProductsPage, MutationTypes.SET_ROWS_PER_PRODUCTS_PAGE)
    const changeRowsPerProductsPage = (event: Event) => {
      rowsPerProductsPage.value = +(event.target as HTMLSelectElement).value
    }
    const currentProductsPage = useWritableComputedRef(() => store.state.currentProductsPage, MutationTypes.SET_CURRENT_PRODUCTS_PAGE)
    const openPreviousProductsPage = () => { currentProductsPage.value-- }
    const openNextProductsPage = () => { currentProductsPage.value++ }
    const sortProducts = (event: SortEvent) => {
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
      technologiesOnPage,
      technologiesCurrentPageInfo,
      clickOnTechnologyRow,
      rowsPerTechnologiesPage,
      changeRowsPerTechnologiesPage,
      openPreviousTechnologiesPage,
      openNextTechnologiesPage,
      productsOnPage,
      productsColumnsSetup,
      productsCurrentPageInfo,
      rowsPerProductsPage,
      changeRowsPerProductsPage,
      openPreviousProductsPage,
      openNextProductsPage,
      sortProducts,
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
  padding: 1em 2.5em 2em 2.5em;
}
</style>
