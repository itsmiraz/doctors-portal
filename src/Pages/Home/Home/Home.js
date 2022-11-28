import React from 'react';
import Banner from '../Banner/Banner';
import Card from '../Cards/Card';
import Details from '../Details/Details';
import GetAppoinment from '../GetAppoinment/GetAppoinment';
import Revirews from '../Reviews/Revirews';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Card></Card>
            <Services></Services>
            <Details></Details>
            <GetAppoinment></GetAppoinment>
            <Revirews></Revirews>
        </div>
    );
};

export default Home;