import { Box, Button, Paper, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import publicService from '../../../service/public.ts';
import { useSnackbar } from 'notistack';


export default function OtpPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [otp, setOtp] = useState<string>();
    const token = useLocation().state;
    const navigate = useNavigate();
    const verifyOtp = async () => {
        try {
            const data = { otp: parseInt(otp!), token: token }
            const result = await publicService.verifyOtp(data);
            console.log(result);
            if (result.success) {
                navigate('/reset-password', { state: token });
            }
            else {
                enqueueSnackbar(result.message, {
                    variant: "error",
                    autoHideDuration: 3000,
                })
            }
        }
        catch (error: any) {
            enqueueSnackbar(error, {
                variant: "error",
                autoHideDuration: 3000,
            })
        }
    }
    const theme = useTheme();
    return (
        <Box className='flex justify-center items-center' sx={{ height: '100vh', backgroundColor: theme.palette.background.default }}>
            <Paper className='w-[40%] p-5'>
                <Typography className='' variant='h4'>Going to recover your account</Typography>
                <hr className='mt-3 mb-3' />
                <TextField
                    label="Enter your OTP here"
                    margin='normal'
                    fullWidth
                    required
                    type='text'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <hr className='mt-3 mb-3' />
                <div className='flex flex-row items-center justify-between'>
                    <Button variant='contained' sx={{ width: "50%" }} onClick={verifyOtp}>Verify</Button>
                    <Typography>Time left: 2:00</Typography>
                </div>
            </Paper>
        </Box>
    )
}
