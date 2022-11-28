import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import location from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'
const Card = () => {
    return (
        <div className='grid mx-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='text-white p-10 shadow-xl rounded-xl gap-2 items-center  flex-col md:flex-row   flex bg-gradient-to-r from-primary to-secondary'>
                <img src={clock} alt="" />
                <div>
                    <h1 className='text-3xl font-semibold'>Opening Hours</h1>
                    <p className=''>Lorem Ipsum is simply dummy text of the pri</p>
                </div>
            </div>
            <div className='text-white p-10 rounded-xl shadow-xl gap-4 items-center flex-col md:flex-row   flex bg-gray-700'>
                <img src={location} alt="" />
                <div>
                    <h1 className='text-3xl font-semibold'>Visit our location</h1>
                    <p className=''>Brooklyn, NY 10036, United States</p>
                </div>
            </div>
            <div className='text-white p-10 rounded-xl shadow-xl gap-2 items-center flex-col md:flex-row   flex bg-gradient-to-r from-primary to-secondary'>
                <img className='font-bold' src={phone} alt="" />
                <div>
                    <h1 className='text-3xl font-semibold'>Contact us now</h1>
                    <p className=''>+000 123 456789</p>
                </div>
            </div>
        </div>
    );
};

export default Card;