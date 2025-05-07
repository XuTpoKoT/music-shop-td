import { ErrorResponse } from '@/dto/RequestState';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';

// export const API_URL = `http://185.246.66.229:8000/v1`
// export const API_URL = `http://192.168.1.246:8000/v1`
export const API_URL = import.meta.env.VITE_API_URL + '/v1';


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('token') != null) {
        console.log("Token for request: " + localStorage.getItem('token'));
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

export function getServerErrorMessage(e: unknown): string {
    let errMsg = 'Error: unknown';
  
    if (e instanceof z.ZodError) {
      const issues = e.errors.map((error) => {
        const { path, message } = error;
        return `Path "${path.join('.')}" - ${message}`;
      }).join('; ');
      errMsg = `Error: wrong response format. Issues: ${issues}`;
    } else if (axios.isAxiosError(e)) {
      errMsg = 'AxiosError: ' + (e.response?.data?.message ?? 'connection failed');
    } else if (e instanceof Error) {
      errMsg = 'Error: ' + (e.message ?? 'unknown');
    }
  
    return errMsg;
}

export default $api;
