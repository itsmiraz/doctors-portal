import React from "react";

const AppoinmentCard = ({ appoinment, setTreatments }) => {
  const { name, slots, price } = appoinment;
  return (
    <div>
      <div className="card shadow-xl">
        <div className="card-body text-center">
          <h2 className="font-bold text-secondary text-xl">{name}</h2>
          <p>{slots[0]}</p>
          <p>
            {slots.length} {slots.length > 0 ? "spaces" : "space"} available
          </p>
          <p>Price: ${price}</p>
          <div className="card-actions justify-center">
            <label
              htmlFor="button-modal"
              className="btn btn-primary"
              disabled={slots.length === 0}
              onClick={() => setTreatments(appoinment)}
            >
              Book Appoinment
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentCard;
