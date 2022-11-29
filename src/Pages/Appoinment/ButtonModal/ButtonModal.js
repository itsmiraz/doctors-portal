import { format } from "date-fns";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/UserContext";

const ButtonModal = ({ treatment, selectedDate, setTreatments, refetch }) => {
  const { name, slots, price } = treatment;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const Patientname = form.name.value;
    const Patientphone = form.phone.value;
    const Patientemail = form.email.value;
    const slot = form.slot.value;

    const booking = {
      treatmentName: name,
      Patientname,
      Patientemail,
      Patientphone,
      slot,
      price,
      bookedDate: date,
    };

    fetch("https://doctors-portal-server-snowy-pi.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setTreatments(null);
          refetch();
          toast.success("SuccessFully Booked");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="button-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="button-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={handleSubmit}>
            <input
              defaultValue={date}
              type="text"
              placeholder="Type here"
              className="input bg-gray-200 input-bordered w-full my-2"
            />
            <select name="slot" className="select select-bordered w-full my-2">
              {slots?.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              defaultValue={user?.displayName}
              name="name"
              required
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full my-2"
            />
            <input
              defaultValue={user?.email}
              name="email"
              required
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full my-2"
            />
            <input
              name="phone"
              required
              defaultValue={price}
              type="text"
              placeholder="Your Phone"
              className="input input-bordered w-full my-2"
            />
            <input
              name="phone"
              required
              type="text"
              placeholder="Your Phone"
              className="input input-bordered w-full my-2"
            />

            <br />
            <button type="submit" className="btn w-full my-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ButtonModal;
