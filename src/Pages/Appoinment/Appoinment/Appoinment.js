import React from 'react';
import { useState } from 'react';
import AppoinmentOptions from '../AppoinmentOptions/AppoinmentOptions';
import AppoinmentBanner from '../AppoinmnetBanner/AppoinmentBanner';


const Appoinment = () => {

    const [selectedDate, SetSelectedDate] = useState(new Date())

    return (
        <div>
            <AppoinmentBanner
                selectedDate={selectedDate}
                SetSelectedDate={SetSelectedDate}
            ></AppoinmentBanner>

            <AppoinmentOptions
                selectedDate={selectedDate}

            ></AppoinmentOptions>

        </div>
    );
};

export default Appoinment;