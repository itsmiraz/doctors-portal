import React from 'react';
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import ReviewCard from './ReviewCard';
import quote from '../../../assets/icons/quote.svg'
const Revirews = () => {

    const reviewData = [
        {
            id: 1,
            details: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            pic: people1,
            name: 'Miraj',
            country: 'America'
        },
        {
            id: 2,
            details: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            pic: people2,
            name: 'Fahima',
            country: 'CalirFonia'
        },
        {
            id: 3,
            details: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            pic: people3,
            name: 'Tasfiya',
            country: 'Bangladesh'
        },
    ]

    return (
        <section className='mx-4 my-20 md:mx-14'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-primary text-2xl font-semibold'>Testimonial</h1>
                    <h1 className='text-4xl '>What Our Patients Says</h1>
                </div>
                <img className='w-24 md:w-48' src={quote} alt="" />
            </div>
            <div className='grid gap-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                {
                    reviewData.map(rev => <ReviewCard
                        key={rev.id}
                        rev={rev}
                    ></ReviewCard>)
                }
            </div>
        </section>
    );
};

export default Revirews;