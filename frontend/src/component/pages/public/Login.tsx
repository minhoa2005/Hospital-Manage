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
            if (result.success) {
                enqueueSnackbar('Đăng nhập thành công!', {
                    variant: 'success',
                    autoHideDuration: 2000,
                });
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
            className="flex justify-center items-center w-50"
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
                <Box className="flex flex-row items-center justify-center" sx={{ mt: 2 }}>
                    <Button sx={{ width: "50%" }} variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
                <Paper className="mt-2 flex flex-row justify-center gap-3 flex-wrap" sx={{ border: 'none', boxShadow: 'none' }}>
                    <Link href="/register" sx={{ textDecoration: "none" }}>
                        Create your account
                    </Link>
                    <Link href="/forgot-password" sx={{ textDecoration: "none" }}>
                        Forgot your password ?
                    </Link>
                </Paper>
            </Paper>
        </Paper>

    )
}
