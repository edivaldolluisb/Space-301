import axios, { AxiosInstance } from 'axios';

// Constantes
const API_BASE_AUTH_URL = `${import.meta.env.VITE_API_BASE_AUTH_URL}`;
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL2}`;

// Interfaces
interface Credentials {
  email: string;
  password: string;
}

interface User extends Credentials {
  name: string;
}

interface AuthResponse {
  token: string;
  id: number | string;
  user: User;
}

interface Alert {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: string;
}

// Type para dados genéricos de POST/PUT
interface ApiData {
  [key: string]: string | number | boolean | object | null;
}

// Criação da instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Instância específica para autenticação
const authApi: AxiosInstance = axios.create({
  baseURL: API_BASE_AUTH_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções de autenticação
export const auth = {
  async register(user: User): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/register', user);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id.toString());
    }
    return response.data;
  },

  async login(credentials: Credentials): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id.toString());
    }
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  }
};

// Funções de API
export const apiService = {
  // GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await api.get<T>(endpoint);
    return response.data;
  },

  // POST request
  async post<T>(endpoint: string, data: ApiData): Promise<T> {
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },

  // PUT request
  async put<T>(endpoint: string, id: number, data: ApiData): Promise<T> {
    const response = await api.put<T>(`${endpoint}/${id}`, data);
    return response.data;
  },

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await api.delete<T>(endpoint);
    return response.data;
  },

  // PATCH request
  async patch<T>(endpoint: string, data?: ApiData): Promise<T> {
    const response = await api.patch<T>(endpoint, data || {});
    return response.data;
  },


  // Função específica para alerts
  async getAlerts(): Promise<Alert[]> {
    return this.get<Alert[]>('/alerts');
  },

  // Método específico para atualizar alerts
  async updateAlerts(data?: ApiData): Promise<{ updated: number }> {
    return this.patch<{ updated: number }>('/alerts', data);
  }

};

// Export das instâncias
export { api, authApi };