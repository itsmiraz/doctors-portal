import React from 'react';
import bg from '../../../assets/images/bg.png'
import heroimg from '../../../assets/images/chair.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
const Banner = () => {
    return (
        <div>
            <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} className="hero  my-4 md:my-32">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img alt='' src={heroimg} className="w-full md:w-1/2 rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                        <p className="py-6 ">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Login</PrimaryButton>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Banner;