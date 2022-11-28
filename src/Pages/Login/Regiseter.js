import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import useToken from '../../Hooks/useToken';

const Regiseter = () => {

    const [err,setErr] = useState('')
    const [createdUserEmail,setuserEmail] = useState('')
    const navigate = useNavigate()
    const [token] = useToken(createdUserEmail)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'; 

    if(token){
        navigate('/')
    }

    // context
    const {signUp,updateUser} = useContext(AuthContext)


    // REACT Form
        const {register,handleSubmit, formState: { errors }} = useForm()
        const handleSignup = data =>{
            console.log(data)
            signUp(data.email, data.password)
            .then(result =>{
               
                const userInfo = {
                    displayName: data.name
                }

                updateUser(userInfo)
                .then(() => {
                    saveUser(data.name, data.email);
                })
                .catch(err => console.log(err));
            
                console.log(result)
               
            })
            .catch(error=>{
                console.log(error);
                setErr(error.message)
            })
        }
 
// save user to db
const saveUser =(name,email)=>{
    const user ={name,email}
    fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
        setuserEmail(email)
    })
}



    return (
        <div>
             <div className='flex justify-center h-[600px] items-center'>
            <div className='w-96'>
                <h1 className='text-xl text-center font-bold my-10'>Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignup)}>
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
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type='password'
                            {...register('password', {required:'Password is Required' , minLength:{value:6, message:"Password Must be 6 characters"}, pattern:{value:/[a-z]+$/i ,message:'More Stornger'}   } )}
                        className='input input-bordered w-full my-2' placeholder="Password" />

                       
                    </div>
                    <p className='text-red-500'>{errors.name?.message || errors.email?.message || errors.password?.message || err}</p>
                  
                    <input value='Sign Up' className='btn w-full my-2' type="submit" />
                </form>
                <p className='text-center font-semibold'>Already have an Account? <Link to='/login' className='text-secondary'>Sign in</Link></p>
              
            </div>
        </div>
        </div>
    );
};

export default Regiseter;