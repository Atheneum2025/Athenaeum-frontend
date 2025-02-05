import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            console.error('session expired')
            window.location.href = '/login';
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;