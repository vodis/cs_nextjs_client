import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => ({
    ...config,
    headers: {
        ...config.headers,
        Authorization: Cookies.get('auth-token') || '',
    },
}));

axios.interceptors.request.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            Cookies.remove('auth-token');
        }
        return Promise.reject(error);
    },
);