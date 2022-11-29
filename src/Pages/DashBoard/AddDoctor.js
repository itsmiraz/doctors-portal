import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const {register,handleSubmit, formState: { errors }} = useForm()
    const navigate = useNavigate()
    const imgHostKey = process.env.REACT_APP_imgbbKey

    const {data:specialty=[]} = useQuery({
        queryKey:['specialty'],
        queryFn:async()=>{
            const res = await fetch('https://doctors-portal-server-snowy-pi.vercel.app/specialty')
            const data = res.json()
            return data
        }
    })

    const handleAddDoctor = data =>{
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image',image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url,{
            method:'POST',
            body: formData,
        })
        .then(res=>res.json())
        .then(imgData=>{
            
            if(imgData.success){

                const doctor={
                    name:data.name,
                    email:data.email,
                    specialty:data.specialty,
                    img:imgData.data.url
                }
                console.log(imgData.data.url)
                fetch('https://doctors-portal-server-snowy-pi.vercel.app/doctors',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(doctor)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    toast.success('Doctor Added Successfully')
                    navigate('/managedoctors')
                })
               

            }
        })
    }

    return (
        <div className='w-96 p-5'>
               <h1>Add Doctor</h1>
               <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type='text'
                        {...register('name', {required :'Name is Required'})}
                            className='input input-bordered w-full my-2' placeholder="Name" />
                           
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type='email'
                        {...register('email',{ required:'Email is required'})}
                            className='input input-bordered w-full my-2' placeholder="Email" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Specalty</span>
                        </label>
                        <select 
                        {...register('specialty',{ required:'Specilty is required'})}
                        className="select select-bordered w-full ">
                           {
                            specialty.map(specialt=><option value={specialt.name} key={specialt._id}>{specialt.name}</option>)
                           }
                        </select>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Image</span>
                        </label>
                        <input type='file'
                        {...register('image', {required :'image is Required'})}
                            className='input input-bordered w-full p-2 my-2' placeholder="Name" />
                           
                    </div>
                  
                  
                    <input value='Add Doctor' className='btn w-full my-2' type="submit" />
                </form>
        </div>
    );
};

export default AddDoctor;