import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { delay } from '@/util/delay'

class APIService {
  private axiosInstance: AxiosInstance

  constructor () {
    this.axiosInstance = axios.create({
      baseURL: 'https://qwe3qwe3.com'
    })
  }

  private async axiosCall<T> (config: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.request<T>(config)
      return data
    } catch (error) {
      throw new Error((error as AxiosError).message)
    }
  }

  async getCountriesList (): Promise<string[]> {
    await delay(300)
    return ['Albania', 'USA']
    // return this.axiosCall<string[]>({ method: 'get', url: '/countries' })
  }

  async getYearsList (): Promise<string[]> {
    await delay(300)
    return ['2020', '2021']
    // return this.axiosCall<string[]>({ method: 'get', url: '/years' })
  }
}

export const apiService = new APIService()
