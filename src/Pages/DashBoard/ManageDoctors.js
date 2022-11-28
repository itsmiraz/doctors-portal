import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deleteDoctor, setDeleteDoctor] = useState(null);

  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accesToken")}`,
          },
        });
        const data = res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const closeModal = () => {
    setDeleteDoctor(null);
  };

  const handleDeleteDoctor = (data) => {
    fetch(`http://localhost:5000/doctors/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accesToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Doctor Deleted SuccessFully");
        }
      });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Manage Doctors</h1>
      {doctors.length === 0 ? (
        <>
          <h1>You Have 0 Doctors Please Add an Doctor</h1>
        </>
      ) : (
        <>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>

                  <th>Email</th>
                  <th>specialty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, i) => (
                  <tr key={doctor._id}>
                    <th>
                      <label>{i + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={doctor.img}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold"> {doctor.name}</div>
                        </div>
                      </div>
                    </td>

                    <td>{doctor.email}</td>
                    <td>{doctor.specialty}</td>
                    <td>
                      <label
                        onClick={() => setDeleteDoctor(doctor)}
                        htmlFor="confirmationModal"
                        className="btn btn-error"
                      >
                        Delete
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {deleteDoctor && (
              <ConfirmationModal
                title={`Confirm Delete`}
                message={`Do you want to delete ${deleteDoctor.name}`}
                handleDeleteDoctor={handleDeleteDoctor}
                modalData={deleteDoctor}
                closeModal={closeModal}
              ></ConfirmationModal>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageDoctors;
