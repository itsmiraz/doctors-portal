import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import Loading from "../Shared/Loading/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const MyAppoinments = () => {
  const [startDate, setStartDate] = useState(new Date());

  const date = format(startDate, 'PP')
  const { user } = useContext(AuthContext);
  const url = `https://doctors-portal-server-snowy-pi.vercel.app/bookings?date=${date}&email=${user?.email}`;
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ["bookings", date, user?.email,],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accesToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return Loading;
  }

  
 
 
  return (
    <div className="overflow-x-auto relative h-screen w-full">
      <div className="font-semibold  flex items-center ">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>

        <DatePicker className="px-2 rounded-lg py-1" selected={startDate} onChange={(date) => setStartDate(date)} />

      </div>
      <table className="table w-full lg:w-[820px]">

        {
          bookings.length === 0 ? <>
            <h1 className="my-4 text-center mx-auto font-semibold ">Your Have 0 booking on {date}</h1>
          </>
            :
            <>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Treatment</th>
                  <th>Slot</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking, i) => (
                  <tr key={booking._id}>
                    <th>{i + 1}</th>
                    <td>{booking?.Patientname}</td>
                    <td>{booking?.treatmentName}</td>
                    <td>{booking?.slot}</td>
                    <td>{booking?.bookedDate}</td>
                    <td>$ { booking?.price}</td>
                    <td>
                      {booking.price && !booking.paid && (
                        <Link to={`/payment/${booking._id}`}>
                          <button className="btn btn-sm text-white btn-secondary">Pay Now</button>
                        </Link>
                      )}
                      {booking.price && booking.paid && <span>Paid</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
        }

      </table>
    </div>
  );
};

export default MyAppoinments;
