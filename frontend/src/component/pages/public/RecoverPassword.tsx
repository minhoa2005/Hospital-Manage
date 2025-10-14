import { Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { use, useState } from 'react'
import publicService from '../../../service/public.ts';
import type { resetPasswordData } from '../../../../type/publicType.ts';
import { useLocation } from 'react-router-dom';

export default function RecoverPassword() {
    const theme = useTheme();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();
    const token = useLocation().state
    const resetPassword = async () => {
        try {
            if (password !== confirmPassword) {
                enqueueSnackbar('Password not match', {
                    variant: "error",
                    autoHideDuration: 3000,
                });
                setConfirmPassword('');
                return;
            }
            const data: resetPasswordData = {
                password: password,
                token: token
            }
            const result = await publicService.resetPassword(data);
            if (result.success) {
                enqueueSnackbar('Reset password successfully', {
                    variant: "success",
                    autoHideDuration: 3000,
                });
                setTimeout(() => window.location.href = '/login', 3000);
            } else {
                enqueueSnackbar(result.message, {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            }
        }
        catch (error: any) {
            enqueueSnackbar(error, {
                variant: "error",
                autoHideDuration: 3000,
            })
        }
    }
    return (
        <Box className='flex justify-center items-center' sx={{ height: '100vh', backgroundColor: theme.palette.background.default }}>
            <Paper className='w-[40%]' sx={{ padding: '30px' }}>
                <Typography variant='h5'>Recover your password</Typography>
                <TextField
                    fullWidth
                    label='New Password'
                    margin='normal'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    fullWidth
                    label='Confirm New Password'
                    margin='normal'
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <hr className='my-3' />
                <Button variant='contained' color='primary' fullWidth onClick={resetPassword}>
                    Reset Password
                </Button>
            </Paper>
        </Box>
    )
}
