import React from 'react';
import doctorsmall from '../../../assets/images/doctor-small.png'
import bg from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
const GetAppoinment = () => {
    return (
        <div>
            <div style={{ backgroundImage: `url(${bg})` }} className="hero h-[533px] px-4 my-32 md:px-42 md:mt-38 mb-20 ">
                <div className="hero-content justify-around flex gap-14 flex-col lg:flex-row">
                    <img alt='' src={doctorsmall} className="rounded-lg -mt-24 hidden md:block md:w-[644px] " />
                    <div>
                        <h1 className="text-xl text-primary font-semibold"> Appointment</h1>
                        <h1 className="text-3xl text-white font-bold">Make an appointment Today</h1>

                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>Getting Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetAppoinment;