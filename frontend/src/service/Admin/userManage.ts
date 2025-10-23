import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

const userManage = {
    getAllUser: async () => {
        try {
            const response = await api.get('/admin/users');
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return {
                success: false,
                data: response.data.message
            }
        }
        catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
    },

    getUserDetailById: async (id: number) => {
        try {
            const response = await api.get(`/admin/user/${id}`);
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                }
            }
            return {
                success: false,
                message: response.data?.message || 'Can not find user'
            }
        }
        catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'An error occurred'
            }
        }
    }
}

export default userManage;