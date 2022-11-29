import { createBrowserRouter } from "react-router-dom";
import DashBoad from "../../Layout/DashBoad";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About";
import Appoinment from "../../Pages/Appoinment/Appoinment/Appoinment";
import AddDoctor from "../../Pages/DashBoard/AddDoctor";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import ManageDoctors from "../../Pages/DashBoard/ManageDoctors";
import Payment from "../../Pages/DashBoard/Payment";
import Users from "../../Pages/DashBoard/Users";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Regiseter from "../../Pages/Login/Regiseter";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
   

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Regiseter></Regiseter>,
      },
      {
        path: "/appoinment",
        element: <Appoinment></Appoinment>,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashBoad></DashBoad>
      </PrivateRoute>
    ),
   
    children: [
      {
        path: "/dashboard",
        element:<PrivateRoute> <DashBoard></DashBoard></PrivateRoute>,
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            
            <AdminRoute>
            <Users></Users>
          </AdminRoute>
         </PrivateRoute>
        ),
      },
      {
        path: "/adddoctor",
        element: (
          <PrivateRoute>
            
            <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
         </PrivateRoute>
        ),
      },
      {
        path: "/managedoctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/payment/:id",
        loader: ({ params }) =>
          fetch(`https://doctors-portal-server-snowy-pi.vercel.app/bookings/${params.id}`),
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
