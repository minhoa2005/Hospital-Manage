import React, { useEffect } from 'react'
import { useUserContext } from '../UserContext.tsx'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function PrivateRoute({ children, role }: any) {
    const { authen, loading, user, logout } = useUserContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (loading) return;
        if (!authen) {
            navigate("/login");
        }
        console.log(user.role)
        if (user && user.role && !role.includes(user?.role)) {
            enqueueSnackbar("You don't have permission to access this page or function", {
                variant: 'error',
                autoHideDuration: 3000,
            });
            logout();
        }
    }, [loading, authen, user])
    return (
        <div>
            {children}
        </div>
    )
}