import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../Shared/Loading/Loading";

const Users = () => {
  const { data: users = [], isLoading,refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://doctors-portal-server-snowy-pi.vercel.app/users", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accesToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`https://doctors-portal-server-snowy-pi.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accesToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Successfully Made Admin");
          refetch();
        }
      });
  };


  const handleDelete = (id) => {
    fetch(`https://doctors-portal-server-snowy-pi.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        authorization:`bearer ${localStorage.getItem('accesToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        refetch()
        toast.success('User Deleted Successfully')
    })

  }

  if (isLoading) {
  return <Loading></Loading>
}
console.log(users);
  return (
    <div>
      <h1 className="text-center my-3 text-xl font-semibold">Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
            
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
               
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role !== "admin" ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn"
                    >
                      Make Admin
                    </button>
                  ) : (
                    "Admin"
                  )}
                </td>
                <td>
                  <button onClick={()=>handleDelete( user._id)} className="btn btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
