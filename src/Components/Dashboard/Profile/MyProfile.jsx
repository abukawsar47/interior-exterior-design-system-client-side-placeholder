import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/Firebase.init";
import UpdateProfileModal from "./UpdateProfileModal";
import { useQuery } from "react-query";
import LoadingData from "../../Loading/LoadingData";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const [openUpdateModal, setOpenUpdateModal] = useState(null);

  const getData = async () => {
    return await axios.get(
      `https://tekno-interior-server.onrender.com/api/user/${user?.email}`
    );
  };

  const {
    data: userInfo,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["storeProfileInfo", 1], queryFn: getData });

  if (isLoading) {
    return <LoadingData />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className="min-h-fit md:m-16 m-4">
        <div className="flex-1  flex flex-col">
          <div className=" p-6 rounded-2xl  shadow">
            <div className="divider before:bg-secondary after:bg-secondary">
              <h2 className=" uppercase md:text-4xl text-secondary font-bold">
                My Profile
              </h2>
            </div>
            <form autoComplete="off">
              <div className="xl:my-32 lg:my-16 md:my-8 my-4 ">
                <div className="flex lg:flex-row flex-col  items-center justify-center lg:gap-10 md:gap-6 gap-4">
                  <div className="avatar">
                    <div className="lg:w-80 md:w-56 w-32 ring-2 ring-secondary ring-offset-base-100 ring-offset-2 rounded">
                      <img src={user?.photoURL} alt="user img" />
                    </div>
                  </div>
                  <div className="flex flex-col md:gap-4 gap-2 md:font-semibold md:text-xl">
                    <p>
                      <strong>Name: </strong> {user?.displayName}
                    </p>
                    <p>
                      <strong>Email: </strong> {user?.email}
                    </p>
                    <p>
                      <strong>Phone: </strong> {userInfo?.data?.phoneNumber}
                    </p>
                    <p>
                      <strong>Profession: </strong> {userInfo?.data?.occupation}
                    </p>
                    <p>
                      <strong>Address:</strong> {userInfo?.data?.billingAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="divider before:bg-secondary after:bg-secondary">
                <label
                  htmlFor="update-profile"
                  onClick={() => setOpenUpdateModal({ email: user?.email })}
                  className="btn  md:btn-md btn-sm modal-button btn-secondary md:px-10 text-white font-bold"
                >
                  Update Profile
                </label>
              </div>
            </form>
            {openUpdateModal && (
              <UpdateProfileModal
                openUpdateModal={openUpdateModal}
                setOpenUpdateModal={setOpenUpdateModal}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
