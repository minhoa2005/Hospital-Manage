import React, { useEffect } from 'react'
import { useUserContext } from '../UserContext.tsx'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function PublicRoute({ children }: any) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { authen, loading, user } = useUserContext();
    useEffect(() => {
        if (authen) {
            navigate(user?.role === 'Admin' ? `/admin/home` : user?.role === 'Patient' ? '/apartment-list' : '')
        }
    }, [authen, navigate])
    return (
        <div>
            {children}
        </div>
    )
}
