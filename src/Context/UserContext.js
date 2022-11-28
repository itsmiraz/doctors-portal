import React, { useEffect } from 'react';
import { createContext } from 'react';
import{ createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/firebase.init';
import { useState } from 'react';

export const AuthContext = createContext()

const UserContext = ({ children }) => {
   const[user,setUser] = useState('')
    const auth = getAuth(app)
    const [loading,setLoading] = useState(true)

 // Dark Mode
 const [theme, setTheme] = useState('light');



 useEffect(() => {
     if (theme === "dark") {
         document.documentElement.classList.add("dark");
     } else {
         document.documentElement.classList.remove("dark");
     }
 }, [theme]);

 const handleThemeSwitch = () => {
    console.log('clicked')
     setTheme(theme === "dark" ? "light" : "dark");
 };




    // Google Auth Provider 
    const googleProvider = new GoogleAuthProvider()

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }


    // Creating user
    const signUp = (email,password ) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    } 
   
    // Sign IN USER 
    const singIN = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }



    // Sign Out user 
    const LogOut = ()=>{
        return signOut(auth)
    }

    const updateUser = (userInfo) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo);
    }
    // onAuhtState Change
    useEffect(()=>{
     const unsubscribe =   onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    },[auth])


    const authInfo = {
        user,
        signUp,
        loading,
        singIN,
        googleSignIn,
        LogOut,
        updateUser,
        handleThemeSwitch
        
    }

   


    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>


    );
};

export default UserContext;