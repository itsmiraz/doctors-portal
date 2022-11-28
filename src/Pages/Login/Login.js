import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import useToken from "../../Hooks/useToken";

const Login = () => {
  // userContext
  const { singIN, googleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const [err, seterr] = useState("");
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");

  const [token] = useToken(email);

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    console.log(data);
    singIN(data.email, data.password)
      .then((result) => {
        setEmail(data.email);
      })
      .catch((error) => {
        console.log(error);
        seterr(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
      
      })
      .catch((error) => {
        console.log(error);
        seterr(error.message);
      });
  };

  // save user to db
  const saveUser = (name, email) => {
    const user = { name, email };
    console.log("saveuser", user);  
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
       
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, email);
        if (data.acknowledged) {
          fetch(`http://localhost:5000/jwt?email=${email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accesToken', data.token)
                toast.success('Logined SuccessFully')
                setTimeout(() => {
                    navigate(from, { replace: true })
  
                }, 500);
            })
          navigate("/");
          
        }
      });
  };

  return (
    <div className="flex mb-10 justify-center h-[600px] items-center">
      <div className="w-96">
        <h1 className="text-xl text-center font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full my-3"
              {...register("email", { required: "Email is Reqired" })}
              placeholder="Email"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full my-3"
              {...register("password", { required: "Password is Required" })}
              placeholder="Password"
            />

            <span className="label-text">Forget Password ?</span>
          </div>
          <p className="text-red-400">
            {errors.email?.message || errors.password?.message}
          </p>
          <p className="text-red-400">{err}</p>

          <input value="login" className="btn w-full my-3" type="submit" />
        </form>
        <p className="text-center font-semibold">
          New to doctor's portal?{" "}
          <Link to="/register" className="text-secondary">
            Create an account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
