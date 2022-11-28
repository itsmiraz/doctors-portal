import React from 'react';
import teeth from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import ServiceCard from './ServiceCard';
const Services = () => {

    const serviceDatea = [
        {
            id: 1,
            title: 'Fluoride Treatment',
            details: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: teeth,
        },
        {
            id: 2,
            title: 'Cavity Filling',
            details: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: cavity,
        },
        {
            id: 3,
            title: 'Teeth Whitening',
            details: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            icon: whitening,
        }
    ]

    return (
        <div className='my-10 md:my-32'>
            <h1 className='text-center text-primary font-semibold text-xl'>OUR SERVICES</h1>
            <h1 className='text-center font-semibold text-3xl'>Services We Provide</h1>

            <div className='grid gap-24 md:gap-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 my-16'>
                {
                    serviceDatea.map(service => <ServiceCard
                        key={service.id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;