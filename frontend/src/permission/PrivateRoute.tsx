import React, { useEffect } from 'react'
import { useUserContext } from '../UserContext.tsx'
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children, role }: any) {
    const { authen, loading, user, logout } = useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!authen) {
            navigate("/login");
        }
        if (user && user.role && user?.role !== role) {
            logout();
        }
    }, [loading, authen, user])
    return (
        <div>
            {children}
        </div>
    )
}