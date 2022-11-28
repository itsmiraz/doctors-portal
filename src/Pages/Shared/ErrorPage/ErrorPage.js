import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";

const ErrorPage = () => {
  const { LogOut } = useContext(AuthContext);
  const error = useRouteError();
  const handleLogout = () => {
    LogOut()
      .then((result) => {
        toast.success("Logout SuccessFully");
      })
      .then((err) => console.log(err));
  };
  return (
    <div>
      <h1 className="text-red-500 text-center text-xl">Something went Wrong</h1>
      <p className="text-red-500 text-center">
        {error.statusText || error.message}
      </p>
      <h1>
        Please{" "}
        <button onClick={handleLogout} className="btn btn-error">
          Log Out
        </button>{" "}
        and Log back in
      </h1>
    </div>
  );
};
export default ErrorPage;
