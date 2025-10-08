import React, { useState } from 'react'
import publicService from '../../../service/public.ts';
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [userName, setUserName] = useState('');
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
            if (!userName) {
                newError.userNameE = 'Cannot be empty';
            } else {
                newError.userNameE = '';
            }
            setError(newError);
            if (newError.confirmPass || newError.passE || newError.userNameE || newError.emailC) {
                return;
            }
            const data = {
                username: userName,
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-5" style={{ width: "30%" }}>
                <h2>Login</h2>
                <hr />
                {error.userNameE && (<p className='text-danger mb-0'>{error?.userNameE}</p>)}
                <div>
                    <label>Username:</label>
                    <input onChange={(e) => setUserName(e.target.value)} className="form-control" type="text" />
                </div>
                {error.passE && (<p className='text-danger mb-0'>{error?.passE}</p>)}
                <div>
                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='form-control' type='password' />
                </div>
                {error.emailC && (<p className='text-danger mb-0'>{error?.emailC}</p>)}
                <div>
                    <label>Email:</label>
                    <input className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                {error.confirmPass && (<p className='text-danger mb-0'>{error?.confirmPass}</p>)}
                <div>
                    <label>Confirm Password:</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className='form-control' type='password' />
                </div>
                <hr />
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <button className='btn btn-primary' style={{ width: "50%" }} onClick={handleRegiser}>Sign Up</button>
                </div>
                <div className='mt-2 d-flex flex-column justify-content-center align-items-center'>
                    <a href='' className='text-decoration-none'>Already have an account ? Login</a>
                    <a href='' className='text-decoration-none'>Forgot your password ?</a>
                </div>
            </div>
        </div>
    )
}
