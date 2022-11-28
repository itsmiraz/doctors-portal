import React from 'react';

const ReviewCard = ({ rev }) => {
    return (
        <div>
            <p className='font-semibold my-4'>
                {rev.details}
            </p>
            <div className='flex items-center gap-4 text-xl'>
                <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img className='w-16' src={rev.pic} alt="" />
                </div>
                <div>
                    <h1 className='font-bold'>{rev.name}</h1>
                    <h1 className='font-semibold'>{rev.country}</h1>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;