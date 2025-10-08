import React, { useEffect, useState } from 'react'
import publicService from '../../../service/public.ts';
import { useUserContext } from '../../../UserContext.tsx';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, authen, user, loading } = useUserContext();
    const handleLogin = async () => {
        try {
            const data = {
                username: userName,
                password: password
            }
            const result = await login(data);
            console.log(result);
            if (result.success) {
                alert('Login Success');
                setUserName('');
                setPassword('');
                navigate('/apartment-list');
            }
            else {
                alert('Error ' + result?.message);
                setUserName('');
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-5" style={{ width: "30%" }}>
                <h2>Login</h2>
                <hr />
                <div>
                    <label>Username:</label>
                    <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                </div>
                <div>
                    <label>Password:</label>
                    <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <hr />
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <button className='btn btn-primary' style={{ width: "50%" }} onClick={handleLogin}>Login</button>
                </div>
                <div className='mt-2 d-flex flex-row justify-content-between'>
                    <a href='/register'>Create your account</a>
                    <a href=''>Forgot your password ?</a>
                </div>
            </div>
        </div>
    )
}
