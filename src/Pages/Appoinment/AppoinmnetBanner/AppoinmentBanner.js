import React from 'react';
import chair from '../../../assets/images/chair.png'

import { DayPicker } from 'react-day-picker';
const AppoinmentBanner = ({ SetSelectedDate, selectedDate }) => {
    return (
        <div>
            <div className="hero my-10">
                <div className="hero-content justify-around flex-col lg:flex-row-reverse">
                    <img src={chair} alt='' className="w-full md:w-2/5 rounded-lg shadow-2xl" />
                    <div>
                        <DayPicker
                            mode="single"
                            onSelect={(data)=>{
                                if(data){
                                    SetSelectedDate(data)
                                }

                            }}
                            selected={selectedDate}
                            

                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppoinmentBanner;