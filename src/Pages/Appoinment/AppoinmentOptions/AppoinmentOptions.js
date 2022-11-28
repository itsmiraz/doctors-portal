import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import AppoinmentCard from '../AppoinmentCard/AppoinmentCard';
import ButtonModal from '../ButtonModal/ButtonModal';

const AppoinmentOptions = ({ selectedDate }) => {

    const [treatment, setTreatments] = useState(null)

    const date = format(selectedDate,'PP')
    console.log(date);
    const {data:appoinments=[],refetch,isLoading} =useQuery({
        queryKey:['appoinments',date],
        queryFn:async()=>{
            const res = await fetch(`http://localhost:5000/appoinmentOptions?date=${date}`)
            const data = await res.json()
            return data

        }
    })
    
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <p className='text-center font-bold text-xl text-primary'>Available Appointments on {format(selectedDate, 'PP')}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-20 gap-8'>
                {
                    appoinments.map(appoinment => <AppoinmentCard
                        key={appoinment._id}
                        appoinment={appoinment}
                        setTreatments={setTreatments}
                    ></AppoinmentCard>)
                }
            </div>
            {
                treatment &&

                <ButtonModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    refetch={refetch}
                    setTreatments={setTreatments}
                ></ButtonModal>
            }


        </div>
    );
};

export default AppoinmentOptions;