import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className='flex justify-center flex-col'>
            <img className='w-24 my-4 mx-auto' src={service.icon} alt="" />
            <div className='text-center'>
                <h1 className=' font-2xl font-semibold'>{service.title}</h1>
                <p>{service.details}</p>
            </div>
        </div>
    );
};

export default ServiceCard;