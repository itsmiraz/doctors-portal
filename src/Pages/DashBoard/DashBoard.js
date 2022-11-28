import React from 'react';
import MyAppoinments from './MyAppoinments';

const DashBoard = () => {
    return (
        <div>
            <h1 className='text-center text-3xl font-semibold my-3'>My Appoinments</h1>
            <MyAppoinments></MyAppoinments>
        </div>
    );
};

export default DashBoard;