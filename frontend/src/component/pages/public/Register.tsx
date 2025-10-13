import React, { useState } from 'react'
import publicService from '../../../service/public.ts';
import { useNavigate } from 'react-router-dom'
import { Box, Paper, TextField, Typography } from '@mui/material';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError]: any = useState({});
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleRegiser = async () => {
        try {
            let newError: any = {};

            if (!email) {
                newError.emailC = 'Cannot be empty';
            } else {
                newError.emailC = '';
            }
            if (confirmPassword !== password) {
                newError.confirmPass = 'Not match';
            } else {
                newError.confirmPass = '';
            }
            if (!password) {
                newError.passE = 'Cannot be empty';
            } else {
                newError.passE = '';
            }
            if (!fullName) {
                newError.fullNameE = 'Cannot be empty';
            } else {
                newError.fullNameE = '';
            }
            setError(newError);
            if (newError.confirmPass || newError.passE || newError.fullNameE || newError.emailC) {
                return;
            }
            const data = {
                fullName: fullName,
                password: password,
                email: email
            }
            const result = await publicService.register(data);
            console.log(result);
            if (result?.success) {
                alert('Success. Please Login');
                navigate('/login');
            }
            else {
                alert(result?.message);
                return;
            }
        }
        catch (error) {
            alert('Error' + error);
        }
    }
    return (
        <Paper className="flex justify-center items-center h-screen">
            <Paper className="p-5 w-[30%]" sx={{ border: '1px solid gray' }}>
                <Typography variant='h4' className=" font-semibold mb-2">Create your account</Typography>
                <hr className="my-3" />

                {error.fullNameE && (
                    <p className="text-red-500 mb-0">{error?.fullNameE}</p>
                )}
                <div className="mb-3">
                    <TextField
                        label="Full Name"
                        type='text'
                        required
                        fullWidth
                        margin='normal'
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                {error.passE && <p className="text-red-500 mb-0">{error?.passE}</p>}
                <div className="mb-3">
                    <TextField
                        label="Email"
                        type='email'
                        required
                        fullWidth
                        margin='normal'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {error.emailC && <p className="text-red-500 mb-0">{error?.emailC}</p>}
                <div className="mb-3">
                    <TextField
                        label="Password"
                        type='password'
                        required
                        fullWidth
                        margin='normal'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error.confirmPass && (
                    <p className="text-red-500 mb-0">{error?.confirmPass}</p>
                )}
                <div className="mb-3">
                    <TextField
                        label="Confirm Password"
                        type='password'
                        required
                        fullWidth
                        margin='normal'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <hr className="my-3" />
                <div className="flex flex-row items-center justify-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md w-1/2 transition"
                        onClick={handleRegiser}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="mt-3 flex flex-col justify-center items-center space-y-1">
                    <a href="/login" className="text-blue-600 hover:underline">
                        Already have an account? Login
                    </a>
                    <a href="" className="text-blue-600 hover:underline">
                        Forgot your password?
                    </a>
                </div>
            </Paper>
        </Paper>
    )
}
