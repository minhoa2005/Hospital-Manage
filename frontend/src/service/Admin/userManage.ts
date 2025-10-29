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
    },

    resetPassword: async (id: number) => {
        try {
            const response = await api.patch(`/admin/user/${id}/resetPass`);
            if (response.data.success) {
                return {
                    success: true,
                    message: response.data?.message || 'Password reset successfully'
                }
            }
            return {
                success: false,
                message: response.data?.message || 'Failed to reset password'
            }
        }
        catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'An error occurred'
            }
        }
    },

    disableAccount: async (id: number) => {
        try {
            const response = await api.patch(`/admin/user/${id}/disable`);
            if (response.data.success) {
                return {
                    success: true
                }
            }
            return {
                success: false,
                message: response.data?.message || 'Failed to disable account'
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