// Dans votre fichier où vous utilisez Axios (par exemple, api.ts)
import axios, { AxiosError } from 'axios';
import store from '../redux/store';
import { setError } from '../redux/store/reducers/error';

interface ICustomError extends AxiosError {
  message: string;
  status: number;
  code: string;
}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError: ICustomError = error.response.data; // Use the custom ICustomError type
    const errorData: ICustomError = {
      code: axiosError.code as string,
      message: axiosError.message as string,
      status: axiosError.status as number,
      // Other relevant data you want to store
      isAxiosError: axiosError.isAxiosError, // Add missing properties
      toJSON: axiosError.toJSON,
      name: axiosError.name,
    };
    if (error.status === 403) {
      console.log('error :', error);
      store.dispatch(setError(errorData));
    }

    return Promise.reject(axiosError);
  }
);

export default instance;
