import { useEffect } from "react";
import { useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState();
  console.log(email);
  useEffect(() => {
    console.log(email);
    if (email) {
      fetch(`https://doctors-portal-server-snowy-pi.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            console.log(data.accessToken);
            localStorage.setItem("accesToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};
export default useToken;
