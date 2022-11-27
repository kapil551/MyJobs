import React, { useState } from 'react'
import LoginBar from '../../components/LoginBar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [loggedInRecruiter, setLoggedInRecruiter] = useState({});
    const navigate = useNavigate();

    const validEmailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handleAuth = () => {
        console.log(email, password);

        if(!email.match(validEmailformat)) {
            setEmailErrorMsg('Please enter a valid email address');
            return;
        }

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        axios.post('https://jobs-api.squareboat.info/api/v1/auth/login', { email, password }, config).then((res) => {
            console.log(res.data.data);
            setPasswordErrorMsg('');

            localStorage.setItem('recruiter', JSON.stringify(res.data.data));
            navigate('/postedjobs');

        }).catch((err) => {
            console.log(err);
            setEmailErrorMsg('');
            setPasswordErrorMsg('Incorrect email address or password');

        });

        setEmail('');
        setPassword('');
    }

    return (
        <div className='pageContainer'>
            <div className='pageTopSection'>
                <LoginBar loggedInRecruiter={loggedInRecruiter} />
            </div>
            <div className='flex justify-center'>
                <div className='loginModal bg-[#FFFFFF] h-[427px] w-[557px] absolute top-[20%] flex flex-col justify-evenly px-[30px] rounded-[20px] shadow-[#557DA526]'>
                    <p className='text-[22px]'> Login </p>
                    <div className='inputContainer'>
                        <label htmlFor="email">Email address</label>
                        <input type="text" id='email' className={`inputField ${emailErrorMsg || passwordErrorMsg ? 'errorInput' : ''}`} placeholder='Enter your email' value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        { emailErrorMsg !== "" && <p className='text-[#FF0000] text-[12px] ml-auto'>{emailErrorMsg}</p> }
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' className={`inputField ${emailErrorMsg || passwordErrorMsg ? 'errorInput' : ''}`} placeholder='Enter your password' value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        { passwordErrorMsg !== "" && <p className='text-[#FF0000] text-[12px] ml-auto'>{passwordErrorMsg}</p> }
                    </div>

                    <button className='text-[#FFFFFF] border border-[#FFFFFF] bg-[#43AFFF] cursor-pointer h-[46px] w-[148px] rounded-[5px] mx-auto' onClick={handleAuth}>Login</button>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;