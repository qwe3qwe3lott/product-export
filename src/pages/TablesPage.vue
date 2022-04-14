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
  <TableComponent class="table-section" v-if="!isTechnologyChosen" :rows-per-page="rowsPerTechnologiesPage" :total-rows="technologiesTotalRows" :current-page="+currentTechnologiesPage" @rowsPerPageChange="rowsPerTechnologiesPage = $event" @pageChange="currentTechnologiesPage = $event">
    <template v-slot:header>
      <TableHeaderComponent :columns-setup="technologiesColumnsSetup" :sort-setup="technologiesSortSetup" @sort="sortTechnologies"/>
    </template>
    <template v-slot:content>
      <TableContentComponent :columns-setup="technologiesColumnsSetup" :data="technologiesOnPage" :clickable="true" @rowClick="clickOnTechnologyRow"/>
    </template>
  </TableComponent>
  <TableComponent class="table-section" v-else :rows-per-page="rowsPerProductsPage" :total-rows="productsTotalRows" :current-page="+currentProductsPage" @rowsPerPageChange="rowsPerProductsPage = $event" @pageChange="currentProductsPage = $event">
    <template v-slot:header>
      <TableHeaderComponent :columns-setup="productsColumnsSetup" :sort-setup="productsSortSetup" @sort="sortProducts"/>
    </template>
    <template v-slot:content>
      <TableContentComponent :columns-setup="productsColumnsSetup" :data="productsOnPage" :clickable="false"/>
    </template>
  </TableComponent>
  <ModalWindow v-if="showClickOnTechnologyError" @close="showClickOnTechnologyError = false">
    <template v-slot:content>
      <p>The considered country does not have manufactured export goods related with patented technologies</p>
      <button class="button" @click="showClickOnTechnologyError = false">OK</button>
    </template>
  </ModalWindow>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
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
import { useWritableComputedRef } from '@/hooks/useWritableComputedRef'
import { Product } from '@/types/Product'
import ModalWindow from '@/components/ModalWindow.vue'

export default defineComponent({
  name: 'TablesPage',
  components: { ModalWindow, TableContentComponent, TableHeaderComponent, TableComponent, DropdownUI },
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
      if (isTechnologyChosen.value) getBackToTechnologies()
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
      { title: 'Index value', property: 'indexValue', width: { value: 11, metric: ColumnWidthMetrics.em } },
      { title: 'Products', property: 'products', width: { value: 7, metric: ColumnWidthMetrics.em } }
    ]
    const technologiesSortSetup = useWritableComputedRef(() => store.state.technologiesSortSetup, MutationTypes.SET_TECHNOLOGIES_SORT_SETUP)
    const showClickOnTechnologyError = ref(false)
    const clickOnTechnologyRow = (event: RowClickEvent) => {
      const technology: Technology = event.element
      if (technology.products.length > 0) {
        chosenTechnology.value = technology
        store.commit(MutationTypes.SET_PRODUCTS_LIST, technology.products)
        isTechnologyChosen.value = true
      } else {
        showClickOnTechnologyError.value = true
      }
    }
    const rowsPerTechnologiesPage = useWritableComputedRef(() => store.state.rowsPerTechnologiesPage, MutationTypes.SET_ROWS_PER_TECHNOLOGIES_PAGE)
    const currentTechnologiesPage = useWritableComputedRef(() => store.state.currentTechnologiesPage, MutationTypes.SET_CURRENT_TECHNOLOGIES_PAGE)
    const technologiesTotalRows = computed(() => store.getters.getCountOfTechnologies)
    const sortTechnologies = (event: SortEvent<Technology>) => {
      store.commit(MutationTypes.SORT_TECHNOLOGIES_LIST, event)
      store.commit(MutationTypes.SET_TECHNOLOGIES_SORT_SETUP, { property: event.key, sortAtoZ: event.sortAtoZ })
    }

    // PRODUCTS TABLE SETUP
    const productsOnPage = computed(() => store.getters.getCurrentProducts)
    const productsColumnsSetup: ColumnSetup[] = [
      { title: 'Product title', property: 'title' }
    ]
    const productsSortSetup = useWritableComputedRef(() => store.state.productsSortSetup, MutationTypes.SET_PRODUCTS_SORT_SETUP)
    const rowsPerProductsPage = useWritableComputedRef(() => store.state.rowsPerProductsPage, MutationTypes.SET_ROWS_PER_PRODUCTS_PAGE)
    const currentProductsPage = useWritableComputedRef(() => store.state.currentProductsPage, MutationTypes.SET_CURRENT_PRODUCTS_PAGE)
    const productsTotalRows = computed(() => store.getters.getCountOfProducts)
    const sortProducts = (event: SortEvent<Product>) => {
      store.commit(MutationTypes.SORT_PRODUCTS_LIST, event)
      store.commit(MutationTypes.SET_PRODUCTS_SORT_SETUP, { property: event.key, sortAtoZ: event.sortAtoZ })
    }

    return {
      showClickOnTechnologyError,
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
      clickOnTechnologyRow,
      rowsPerTechnologiesPage,
      technologiesSortSetup,
      currentTechnologiesPage,
      technologiesTotalRows,
      productsOnPage,
      productsColumnsSetup,
      rowsPerProductsPage,
      currentProductsPage,
      productsTotalRows,
      productsSortSetup,
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
  flex-wrap: wrap;
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
.button {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
  margin-top: 0.5em;
  padding: 0.2em 1em;
  border-radius: 1em;
}
@media (max-width: 1000px) {
  .filter-section {
    padding: 1em 1em 0.5em 1em;
  }
  .table-section {
    padding: 1em 1em 2em 1em;
  }
  .alert-section {
    padding: 0 1em;
  }
}
</style>
