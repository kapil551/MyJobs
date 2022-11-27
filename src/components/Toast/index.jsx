import React from 'react';
import cross from "../../assets/images/Icon metro-cross.svg"

function Toast({setShowToast, toastData}) {
  return (
    <div className='h-[99px] w-[343px] bg-[#ffffff] shadow-[#557DA526] rounded-[5px] fixed top-[5%] right-[4%] p-[20px]'>
        <img src={cross} alt="" className='ml-auto absolute top-[2%] right-[2%] cursor-pointer' onClick={() => {
            setShowToast(false);
        }}/>
        <p className='text-[24px] text-[#43AFFF] '>{toastData.title}</p>
        <p className='text-[17px]'>{toastData.content}</p>
    </div>
  )
}

export default Toast;