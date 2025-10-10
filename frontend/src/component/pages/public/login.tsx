import React, { useEffect, useState } from 'react'
import publicService from '../../../service/public.ts';
import { useUserContext } from '../../../UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, Button, Link, Paper } from "@mui/material"
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';

export default function Login() {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, authen, user, loading } = useUserContext();
    const handleLogin = async () => {
        try {
            const data = {
                email: email,
                password: password
            }
            const result = await login(data);
            console.log(result);
            if (result.success) {
                enqueueSnackbar('Login Successful', { variant: 'success', autoHideDuration: 3000 })
                setEmail('');
                setPassword('');
                navigate('/apartment-list');
            }
            else {
                enqueueSnackbar(result?.message,
                    {
                        variant: 'error', autoHideDuration: 3000,
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    });
                setEmail('');
                setPassword('');
                return;
            }
        }
        catch (error) {
            alert('Error ' + error);
        }
    }
    useEffect(() => {
        if (loading) {
            return;
        }
        if (authen && user) {
            navigate('/apartment-list');
        }
    }, [loading])
    return (
        <Paper
            className="flex justify-center items-center"
            sx={{
                height: "100vh",
                backgroundColor: theme.palette.mode === 'dark' ? '#382d2dff' : 'white'
            }}
        >
            <Paper className="p-5 w-[30%]">
                <Typography variant="h2">Login</Typography>
                <hr />
                <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <hr />
                <div className="flex flex-row items-center justify-center">
                    <Button sx={{ width: "50%" }} variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
                <Paper className="mt-2 flex flex-row justify-center gap-3 flex-wrap shadow-none border-none">
                    <Link href="/register" sx={{ textDecoration: "none" }}>
                        Create your account
                    </Link>
                    <Link href="" sx={{ textDecoration: "none" }}>
                        Forgot your password ?
                    </Link>
                </Paper>
            </Paper>
        </Paper>

    )
}
