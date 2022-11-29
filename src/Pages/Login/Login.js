import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import { PropagateLoader } from 'react-spinners';


const Login = () => {
  // userContext
  const [loadingAnimation, setLoadingAnimation] = useState(false)

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




  const handleLogin = (data) => {
    console.log(data);
    singIN(data.email, data.password)
      .then((result) => {
        saveUser(data.email)
        setLoadingAnimation(true)

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

        saveUser(user.displayName, user.email);

      })
      .catch((error) => {
        console.log(error);
        seterr(error.message);
      });
  };

  // save user to db
  const saveUser = (name, email) => {
    const user = { name, email }
    fetch(`https://doctors-portal-server-snowy-pi.vercel.app/user/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLoadingAnimation(false)
        localStorage.setItem('accesToken', data.data)
        toast.success('Logined SuccessFully')

        navigate(from, { replace: true })


      })
  }

  return (
    <div className="flex mb-10 justify-center h-[600px] items-center">
      {
        loadingAnimation ?
          <>
            <div>
              <PropagateLoader color="#36d7b7" />
            </div>

          </>
          :
          <>

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
          </>
      }
    </div>
  );
};

export default Login;
