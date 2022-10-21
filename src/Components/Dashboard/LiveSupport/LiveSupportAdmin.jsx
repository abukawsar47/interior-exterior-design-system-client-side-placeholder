import React, { useState } from "react";
import SupportModal from "../SupportModal/SupportModal";
import { useQuery } from "react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const LiveSupportAdmin = () => {
  const [openSupportModal, setOpenSupportModal] = useState(null);
  const toast = useToast();
  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/live-support"
    );
  };
  const {
    data: support,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["storeAdminLiveSupport", 1], queryFn: getData });
  const closeLiveSupport = async () => {
    const supportLink = {
      isOpen: false,
    };

    try {
      const newSupport = await axios.patch(
        "https://tekno-interior-server.onrender.com/api/live-support",
        supportLink
      );
      console.log("newSupportLink: ", newSupport);
      if (newSupport.status === 201) {
        toast({
          title: "Live Support Closed.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        refetch();
      } else {
        toast({
          title: "Something Went Wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <div className="flex px-4 justify-center items-center h-screen">
        <div className=" max-w-[500px]  bg-secondary p-10 rounded-xl shadow">
          <div className="flex flex-col justify-center items-center">
            {support?.data?.isOpen && (
              <button
                onClick={() => {
                  closeLiveSupport();
                }}
                className="btn md:btn-md btn-sm btn-error  md:px-10 text-white font-bold"
              >
                Close Live Support
              </button>
            )}
            <h1 className="text-white text-xl font-semibold text-center my-10">
              {support?.data.isOpen
                ? "Live Support Running"
                : " Live Support not started yet"}
            </h1>
          </div>
          <div className="flex justify-center">
            <label
              htmlFor="support-modal"
              onClick={() => {
                setOpenSupportModal({ open: true });
              }}
              className="btn md:btn-md btn-sm  modal-button btn-primary md:px-10 text-white font-bold"
            >
              {support?.data?.isOpen ? "Start New" : "Start Live Support"}
            </label>
          </div>
        </div>
        {openSupportModal && (
          <SupportModal
            setOpenSupportModal={setOpenSupportModal}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
};

export default LiveSupportAdmin;
