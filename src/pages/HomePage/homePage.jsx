import React, { useEffect, useState } from 'react';
import homeImg from "../../assets/images/Screenshot 2020-09-21 at 2.06.52 PM.png";
import solaytic from "../../assets/images/solaytic.png";
import kanba from "../../assets/images/kanba.png";
import light from "../../assets/images/lighting.png";
import ztos from "../../assets/images/ztos.png";
import goldline from "../../assets/images/goldline.png";
import ideaa from "../../assets/images/ideaa.png";
import liva from "../../assets/images/liva.png";
import velocity from "../../assets/images/velocity-9.png";
import LoginBar from '../../components/LoginBar';
import Toast from '../../components/Toast';


const whyUsData = [
    {
        title: 'Get More Visibility', 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
    }, 
    {
        title: 'Organize Your Candidates',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }, 
    {
        title: 'Verify Their Abilities',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
    }
]

const trustedCompaniesData = [
    {
        src: solaytic
    },
    {
        src: kanba
    },
    {
        src: light
    },
    {
        src: ztos
    },
    {
        src: kanba
    },
    {
        src: goldline
    }, 
    {
        src: ideaa
    },
    {
        src: liva
    },
    {
        src: velocity
    }
]

function HomePage() {

    const [loggedInRecruiter, setLoggedInRecruiter] = useState({});
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const loggedInRecruiter = localStorage.getItem('recruiter');
        if(loggedInRecruiter) {
            setLoggedInRecruiter(loggedInRecruiter);
        }
    }, [])

    console.log(loggedInRecruiter);

  return (
    <div className='pageContainer h-[auto]'>

        <div className='pageTopSection'>
             <LoginBar loggedInRecruiter={loggedInRecruiter} setShowToast={setShowToast} />
             <div className='description h-[250px] flex ml-[190px] justify-around mt-[61px]'>
                <div>
                    <p className='text-[40px] text-[#ffffff] mb-[40px] w-2/3'>Welcome to My<span className='text-[#43AFFF]'>Jobs</span></p>
                    <button className='text-[#FFFFFF] bg-[#43AFFF] text-[19px] px-[20px] py-[10px] rounded-[5px]'> Get Started</button>
                </div>
                <div>
                    <div>
                        <img src={homeImg} alt="" className='h-[395px] w-[622px]'/>
                    </div>
                </div>
             </div>
        </div>

        <div className='middleSection h-[30%] pt-[60px] ml-[190px]'>
            <p className='text-[22px] mb-[40px] text-[#303F60]'> Why Us</p>
            <div className='flex justify-evenly'>
                {
                    whyUsData.map((data) => {
                        return (

                            <div className='border border-[#FFFFFF] bg-[#FFFFFF] rounded-md w-[341px] h-[192px] px-[20px]'>
                                <p className='text-[#43AFFF] text-[22px] w-[50%] mb-[29px]'>{data.title}</p>
                                <p className='text-[#303F60] text-[14px]'>{data.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <div className='bottomSection h-[20%] ml-[190px] mt-[80px] pb-[20px]'>
            <p className='text-[22px] mb-[40px] text-[#303F60]'>
                Companies Who Trust Us
            </p>
            <div className='flex flex-wrap justify-center items-center gap-[2.25rem] w-[80%]'>
                {
                    trustedCompaniesData.map((data) => {
                        return (
                            <div>
                                <img src={data.src} alt="" />
                            </div>
                        )
                    })
                }
            </div>

        </div>

        {
            showToast && <Toast setShowToast={setShowToast} toastData={{title: 'Logout', content: 'You have successfully logged out.'}} />
        }

    </div>
  )
}

export default HomePage;