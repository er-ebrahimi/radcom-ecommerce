import axios from 'axios';
import { toast } from 'sonner';

// Debug environment variables at module load
console.log('Axios Module Load - Environment Variables:', {
  'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
  'NEXT_PUBLIC_API_KEY': process.env.NEXT_PUBLIC_API_KEY,
  'NODE_ENV': process.env.NODE_ENV,
});

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.radsup.com/v1/product/fa',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY || 'A5eKsjffqcWnTbUUCF4jQFM3kx9KkTre',
  },
  withCredentials: false, // Disable credentials for CORS
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Debug environment variables
    console.log('Environment Variables Debug:', {
      'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
      'NEXT_PUBLIC_API_KEY': process.env.NEXT_PUBLIC_API_KEY,
      'NODE_ENV': process.env.NODE_ENV,
    });
    
    // Ensure API key is always present
    if (!config.headers['X-Api-Key']) {
      config.headers['X-Api-Key'] = process.env.NEXT_PUBLIC_API_KEY || 'A5eKsjffqcWnTbUUCF4jQFM3kx9KkTre';
    }
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging
    console.log('Making API request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Debug successful responses
    console.log('API Response Success:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      method: response.config.method,
      data: response.data,
    });
    
    // Show success toast for successful POST, PUT, DELETE operations
    if (response.config.method === 'post') {
      toast.success('عملیات با موفقیت انجام شد!');
    } else if (response.config.method === 'put') {
      toast.success('به‌روزرسانی با موفقیت انجام شد!');
    } else if (response.config.method === 'delete') {
      toast.success('آیتم با موفقیت حذف شد!');
    }
    
    return response;
  },
  (error) => {
    // Handle common errors with toast notifications in Farsi
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      toast.error('جلسه شما منقضی شده است. لطفاً دوباره وارد شوید.');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('دسترسی غیرمجاز. شما مجوز انجام این عمل را ندارید.');
    } else if (error.response?.status === 404) {
      toast.error('منبع مورد نظر یافت نشد. لطفاً درخواست خود را بررسی کنید.');
    } else if (error.response?.status === 422) {
      // Validation errors
      const message = error.response.data?.message || 'اعتبارسنجی ناموفق. لطفاً ورودی خود را بررسی کنید.';
      toast.error(message);
    } else if (error.response?.status >= 500) {
      toast.error('خطای سرور. لطفاً بعداً دوباره تلاش کنید.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('زمان درخواست به پایان رسید. لطفاً اتصال خود را بررسی کنید.');
    } else if (error.code === 'ERR_NETWORK') {
      // CORS or network error
      console.error('Network/CORS Error:', error);
      toast.error('خطای CORS یا شبکه. لطفاً اتصال خود را بررسی کنید.');
    } else if (!error.response) {
      // Network error
      console.error('No response error:', error);
      toast.error('خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.');
    } else {
      // Generic error
      console.error('API Error:', error);
      const message = error.response.data?.message || 'خطای غیرمنتظره‌ای رخ داده است.';
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
