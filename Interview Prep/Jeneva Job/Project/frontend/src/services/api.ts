import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url);
    return response.data.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data);
    return response.data.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data);
    return response.data.data;
  }

  async patch<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.patch(url, data);
    return response.data.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url);
    return response.data.data;
  }
}

export const apiClient = new ApiClient();
