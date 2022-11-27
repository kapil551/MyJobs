import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import myJobs from "../../assets/images/MyJobs.svg";
import caretDown from "../../assets/images/Icon awesome-caret-down.svg";
import _isEmpty from "lodash/isEmpty";

function LoginBar({ loggedInRecruiter, setLoginModal, loginModal, setShowToast }) {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
        setShowToast(true);
    }

    console.log(loggedInRecruiter);

    return (
        <>
            <div className='navbar h-[20%] flex justify-between items-center px-4 py-2'>
                <div>
                    <img src={myJobs} alt="my-jobs" />
                </div>
                <div>
                    {
                        !_isEmpty(loggedInRecruiter) ? (
                            <div className='flex items-center gap-[8.66px]'>
                                <div className='h-[46px] w-[46px] bg-[#D9EFFF] rounded-full flex items-center justify-center'>
                                    <p className='text-[#303F60] text-[18px]'>R</p>
                                </div>
                                <p className=''>
                                    <img src={caretDown} alt="" className='cursor-pointer' onClick={() => {
                                        setLoginModal(!loginModal);
                                    }}/>
                                </p>
                            </div>
                        ) :
                            (
                                <button className='text-[#FFFFFF] border border-[#43AFFF] bg-[#43AFFF33] cursor-pointer px-[40px] py-[10px] rounded-[5px]' onClick={handleLogin}>
                                    Login
                                </button>
                            )
                    }

                </div>
            </div>
            <div className='h-[1px] bg-[#4D618E] mt-[5px]'></div>
        </>
    )
}

export default LoginBar