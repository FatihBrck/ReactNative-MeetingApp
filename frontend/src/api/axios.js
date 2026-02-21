import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'http://192.168.2.40:3000/',
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await SecureStore.getItemAsync('refreshToken');

            try {
                const refreshResponse = await axios.post('http://192.168.2.40:3000/mp/user/refresh', { refreshToken });
                const newAccessToken = refreshResponse.data.token;

                await SecureStore.setItemAsync('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (error) {
                console.error('Refresh token failed:', error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
