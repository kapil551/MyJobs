import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginBar from '../../components/LoginBar';
import location from "../../assets/images/Icon material-location-on.svg";
import prev from "../../assets/images/Prev.svg"
import next from "../../assets/images/Nex.svg";
import home from "../../assets/images/Icon ionic-md-home.svg"
import Toast from '../../components/Toast';
import writingPad from "../../assets/images/writing.svg"
import Applicants from '../../components/Applicants';
import LoginModal from '../../components/LoginModal';


function PostedJobs() {
    const [loggedInRecruiter, setLoggedInRecruiter] = useState({});
    const [postedjobs, setPostedJobs] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    const [jobApplicants, setJobApplicants] = useState([]);
    const [loginModal, setLoginModal] = useState(false);

    useEffect(() => {
        const loggedInRecruiter = JSON.parse(localStorage.getItem('recruiter'));
        if (loggedInRecruiter) {
            setLoggedInRecruiter(loggedInRecruiter);
            setShowToast(true);
        }
    }, [])

    useEffect(() => {
        if (loggedInRecruiter !== {}) {
            fetchPostedJobsByPage(page);
        }
    }, [page, loggedInRecruiter])


    const fetchPostedJobsByPage = (page) => {

        const params = { "page": page };

        if (page === 0) {
            axios.get('https://jobs-api.squareboat.info/api/v1/recruiters/jobs', {
                headers: {
                    Authorization: `${loggedInRecruiter.token}`
                }
            }).then((res) => {
                console.log(res);
                setPostedJobs(res.data.data.data);
            }).catch((err) => {
                console.log(err);
            })

        } else {

            axios.get('https://jobs-api.squareboat.info/api/v1/recruiters/jobs', {
                params,
                headers: {
                    Authorization: `${loggedInRecruiter.token}`
                }
            }).then((res) => {
                console.log(res);
                setPostedJobs(res.data.data.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const fetchNextPageJobs = () => {
        setPage((currentPage) => currentPage + 1);
        // fetchPostedJobsByPage(page);
    }

    const fetchPreviousPageJobs = () => {

        if (page === 0) {
            return;
        } else {
            setPage((currentPage) => currentPage - 1);
            // fetchPostedJobsByPage(page);
        }
    }

    // console.log(loggedInRecruiter);
    console.log(page);

    const goToHomePage = () => {
        navigate('/');
    }

    const getApplicantsData = (jobId) => {

        console.log(jobId);

        axios.get(`https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${jobId}/candidates`, {
                headers: {
                    Authorization: `${loggedInRecruiter.token}`
                }
            }).then((res) => {
                console.log(res);

                if(res.data.data !== undefined) {
                    setJobApplicants(res.data.data);
                } else {
                    setJobApplicants([]);
                }
                setShowApplicantsModal(true);
            }).catch((err) => {
                console.log(err);
            })

    }


    return (

        <div className={`pageContainer h-[${postedjobs.length === 0 ? '100vh' : 'auto'}]`}>
            <div className='pageTopSection h-[210px]'>
                <LoginBar loggedInRecruiter={loggedInRecruiter} setLoginModal={setLoginModal} loginModal={loginModal} />
            </div>
            <div className='absolute top-[80px] left-[7%] flex flex-col justify-center w-[100%]'>
                <div className='text-[12px] text-[#ffffff] flex items-center gap-[5px] cursor-pointer' onClick={goToHomePage}>
                    <p>
                        <img src={home} alt="" />
                    </p>
                    Home
                </div>
                <p className='text-[22px] text-[#FFFFFF]'>
                    Jobs Posted by you
                </p>
            </div>
            {
                postedjobs.length !== 0 ? (
                    <>
                        <div className=''>
                            <div className='jobsContainer flex flex-wrap gap-[18px] justify-center mt-[-50px]'>
                                {
                                    postedjobs.map((job) => {
                                        return (
                                            <div key={job.id} className='h-[162px] w-[260px] bg-[#FFFFFF] shadow-[#557DA526] rounded-[5px] flex flex-col p-[15px] justify-between'>
                                                <div>
                                                    <p className='text-[17px] overflow-hidden text-ellipsis whitespace-nowrap text-[#303F60]'>{job.title}</p>
                                                    <p className='text-[12px] overflow-hidden text-ellipsis opacity-80 h-[50px]'>{job.description}</p>
                                                </div>
                                                <div className='flex justify-between al'>
                                                    <p className='flex items-center gap-[9px]'>
                                                        <img src={location} alt="" className='h-[15px] w-[10px]'/>
                                                        <p className='text-[14px] w-[60px] overflow-hidden text-ellipsis'>{job.location}</p>
                                                    </p>

                                                    <p className='text-[12px] text-[#303F60] bg-[#43AFFF33] rounded-[5px] flex items-center justify-center cursor-pointer px-[15px] py-[9px]' onClick={() => getApplicantsData(job.id)}>
                                                        View Application
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='flex gap-[8px] items-center justify-center mt-[59px] pb-[67px]'>
                                <img src={prev} alt="" onClick={fetchPreviousPageJobs} />
                                <p className='bg-[#43AFFF33] text-[#303F60] text-[13px] px-[11px] py-[6px] rounded-[5px]'>{page}</p>
                                <img src={next} alt="" onClick={fetchNextPageJobs} />
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                    <div className='flex flex-col items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <img src={writingPad} alt="" className='h-[106px] w-[106px]'/>
                        <p className='text-[20px] text-[#303F60] mt-[19px]'> Your posted jobs will appear here!</p>
                        <button className='text-[#FFFFFF] border border-[#FFFFFF] bg-[#43AFFF] cursor-pointer h-[46px] w-[148px] rounded-[5px] mt-[40px]'>Post a Job</button>
                    </div>
                    </>
                )
            }

            {
                showToast && <Toast setShowToast={setShowToast} toastData={{title: 'Login', content: 'You have successfully logged in.'}}/>
            }

            {
                showApplicantsModal && <Applicants jobApplicants={jobApplicants} setShowApplicantsModal={setShowApplicantsModal} />
            }
            {
                loginModal && <LoginModal setShowToast={setShowToast} />
            }
        </div>
    )
}

export default PostedJobs;