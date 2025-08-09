import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('authToken');
  
  // Log temporário para debug
  console.log('🔧 API Interceptor:', {
    url: config.url,
    method: config.method?.toUpperCase(),
    tokenPresente: !!token,
    tokenInicio: token ? token.substring(0, 10) + '...' : 'N/A'
  });
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor de resposta para capturar erros
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta bem-sucedida:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta da API:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;