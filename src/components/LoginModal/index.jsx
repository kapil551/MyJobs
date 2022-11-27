import React from 'react';
import { useNavigate } from "react-router-dom";

function LoginModal() {

    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('recruiter');
        navigate('/');
    }
  return (
    <div className='h-[47px] w-[112px] bg-[#ffffff] shadow-[#557DA526] rounded-[5px] fixed top-[5%] right-[1%] p-[12px]'>
        <p className='text-[16px] text-[#303F60] cur cursor-pointer' onClick={handleLogout}>Logout</p>
    </div>
  )
}

export default LoginModal;