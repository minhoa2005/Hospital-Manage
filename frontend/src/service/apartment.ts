import axios from 'axios';
import cookie from 'js-cookie';
import type {updateData} from "../../type/appartmentType.js"

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = cookie.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const apartmentService = {
    getAll: async () => {
        try {
            const result = await api.get('/apartment/get-all');
            if (result.data.success) {
                return {
                    success: true,
                    data: result.data.data
                }
            }
        }
        catch (error) {
            return {
                success: false,
                message: error
            }
        }
    },
    getById: async (id:string) => {
        try {
            const result = await api.get(`/apartment/get-id/${id}`);
            if (result.data.success) {
                return {
                    success: true,
                    data: result.data.data
                }
            }
        }
        catch (error) {
            return {
                success: false,
                message: 'Error' + error
            }
        }
    },
    updateDepartment: async (id:string, data: updateData) => {
        try {
            const result = await api.put(`/apartment/update/${id}`, data);
            return result.data;
        }
        catch (error) {
            return {
                success: false,
                message: 'Error' + error
            }
        }
    }
}

export default apartmentService;