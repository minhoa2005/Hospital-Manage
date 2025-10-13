import React, { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, useTheme } from '@mui/material'
import publicService from '../../../service/public.ts';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function ForgotPassword() {
    const theme = useTheme();
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const sendEmail = async () => {
        try {
            const data = { email: email }
            const result = await publicService.createOtp(data);
            if (result.success) {
                enqueueSnackbar('OTP sent !', {
                    variant: "success",
                    autoHideDuration: 3000
                })
                navigate('/verify-Otp', { state: result.token });
            }
            else {
                enqueueSnackbar(result.message, {
                    variant: "error",
                    autoHideDuration: 3000
                })
            }
        }
        catch (error: any) {
            enqueueSnackbar(error, {
                variant: "error",
                autoHideDuration: 3000
            })
        }
    }
    return (
        <Box className='flex justify-center items-center' sx={{ height: '100vh', backgroundColor: theme.palette.background.default }}>
            <Paper className='w-[40%] p-5'>
                <Typography className='' variant='h4'>Going to recover your account</Typography>
                <hr className='mt-3 mb-3' />
                <TextField
                    label="Enter your email here"
                    margin='normal'
                    fullWidth
                    required
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <hr className='mt-3 mb-3' />
                <div className='flex flex-row items-center justify-between'>
                    <Button variant='contained' sx={{ width: "100%" }} onClick={() => sendEmail()}>Send OTP</Button>
                </div>
            </Paper>
        </Box>
    )
}
