import React from 'react';
import cross from "../../assets/images/Icon metro-cross.svg";
import curriculum from "../../assets/images/curriculum.svg";

function Applicants({jobApplicants, setShowApplicantsModal}) {
    
    const data = [];

    return (
        <div className='h-[100%] w-[100%] fixed border top-0 bg-[#303F60]/[0.4]'>

            <div className='border bg-[#FFFFFF] h-[580px] w-[694px] mx-auto mt-[85px] rounded-[20px]'>
                <div className='flex justify-between px-[30px] pt-[27px] mb-[15px]'>
                    <p className='text-[23px] text-[#303F60]'>Applicants for this job</p>
                    <img src={cross} alt="" onClick={() => {
                        setShowApplicantsModal(false);
                    }}/>
                </div>
                <div className='bg-[#557DA526] h-[2px] w-[90%] mx-auto'></div>
                <p className='px-[30px] pt-[15px] mb-[10px]'> Total {jobApplicants.length} applications </p>
                {
                    jobApplicants.length !== 0 ? (
                        <>
                            <div className='bg-[#557DA526] flex flex-wrap gap-[30px] justify-center h-[420px] mx-[22px] py-[9px] px-[7px] content-start rounded-[10px] overflow-y-scroll'>
                                {
                                    jobApplicants.map((applicant) => {
                                        return (
                                            <div className='bg-[#ffffff] border border-[#303F6080] rounded-[5px] h-[159px] w-[290px] p-[14px] flex flex-col justify-around'>
                                                <div className='flex gap-[20px]'>

                                                    <div>
                                                        <p className='bg-[#D9EFFF] h-[50px] w-[50px] rounded-full flex items-center justify-center'>{applicant.name[0].toUpperCase()}</p>
                                                    </div>
                                                    <div>
                                                        <p>{applicant.name}</p>
                                                        <p className='text-[14px]'>{applicant.email}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Skills</p>
                                                    <p className='text-[14px]'>{applicant.skills}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    ) : (
                        <div className='bg-[#557DA526] flex flex-col gap-[20px] justify-center items-center h-[580px] mx-[22px] pt-[9px] px-[7px] content-start rounded-[10px]'>
                            <img src={curriculum} alt="" />
                            <p className='text-[20px] text-[#303F60]'>No applications available!</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Applicants;