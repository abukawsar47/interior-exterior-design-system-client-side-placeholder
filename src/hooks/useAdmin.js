import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  const getAdmin = async () => {
    if (email) {
      await fetch(
        `https://tekno-interior-server.onrender.com/api/user/admin/${email}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  };
  useEffect(() => {
    getAdmin();
  }, [email]);

  return [admin, adminLoading];
};

export default useAdmin;
