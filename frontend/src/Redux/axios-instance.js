import axios from 'axios'

export const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken') 
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)




