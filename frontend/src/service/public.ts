import axios from "axios";
import cookie from "js-cookie";
import type { registerData, loginData } from "../../type/publicType.js"

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

// api.interceptors.request.use((config) => {
//     console.log('Request sent', config);
// }, (error) => {
//     return Promise.reject(error);
// });

// api.interceptors.response.use((response) =>{
//     return response;
// },
// (error) =>{

// })


const publicService = {
    register: async (data: registerData) => {
        try {
            const result = await api.post('/register', { data });
            return result.data;
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Error: ' + error
            }
        }
    },

    login: async (data: loginData) => {
        try {
            console.log(data);
            const result = await api.post('/login', { data });
            return result.data;
        }
        catch (er: any) {
            console.log(er)
            return {
                success: false,
                message: er.response?.data?.message || er.message
            }
        }
    },

    logout: async () => {
        try {
            const result = await api.get('/logout');
            return result.data;
        }
        catch (error) {
            return {
                success: false,
                message: 'Error' + error
            }
        }
    },

    getCurrentUser: async () => {
        try {
            const result = await api.get('/auth/me');
            if (result.data.success) {
                return {
                    success: true,
                    user: result.data.user
                }
            }
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

export default publicService;
