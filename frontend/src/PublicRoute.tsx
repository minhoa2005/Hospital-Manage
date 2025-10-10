import React, { useEffect } from 'react'
import { useUserContext } from './UserContext.tsx'

export default function PublicRoute({ children }: any) {
    const { authen, loading } = useUserContext();
    useEffect(() => {
        if (loading) return;
        if (authen) {
            window.location.href = "/login"
        }
    }, [loading, authen])
    return (
        <div>
            {children}
        </div>
    )
}
