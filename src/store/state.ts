import { Technology } from '@/types/Technology'

export type State = {
  isTechnologyChosen: boolean
  chosenTechnology: Technology | null
  countries: string[]
  years: string[]
  chosenCountry: string | null
  chosenYear: string | null
  technologies: Technology[]
}

export const state: State = {
  chosenCountry: null,
  chosenTechnology: null,
  chosenYear: null,
  countries: [],
  isTechnologyChosen: false,
  years: [],
  technologies: []
}
