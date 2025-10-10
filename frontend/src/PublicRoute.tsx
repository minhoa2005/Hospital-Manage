import React, { useEffect } from 'react'
import { useUserContext } from './UserContext.tsx'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function PublicRoute({ children }: any) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { authen, loading } = useUserContext();
    useEffect(() => {
        if (authen) {
            navigate('/apartment-list')
        }
    }, [authen, navigate])
    return (
        <div>
            {children}
        </div>
    )
}
