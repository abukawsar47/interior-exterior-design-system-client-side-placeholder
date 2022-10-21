import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const SupportModal = ({ setOpenSupportModal, refetch }) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data, e) => {
    e.preventDefault();
    const supportLink = {
      isOpen: true,
      link: data?.supportLink,
    };

    try {
      const newSupport = await axios.patch(
        "https://tekno-interior-server.onrender.com/api/live-support",
        supportLink
      );
      if (newSupport.status === 201) {
        toast({
          title: "Live Support Started.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        refetch();
        setOpenSupportModal(null);
      } else {
        toast({
          title: "Something Went Wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setOpenSupportModal(null);
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setOpenSupportModal(null);
    }
  };

  return (
    <>
      <input type="checkbox" id="support-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="divider before:bg-secondary after:bg-secondary ">
            <h2 className=" uppercase md:text-4xl text-xl text-secondary font-bold">
              Live Support
            </h2>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
            <div className="flex-1  flex flex-col ">
              <div className="flex flex-col lg:flex-row lg:first-letter:gap-4">
                <div className="md:flex-1 my-4 mb:mt-0 ">
                  <label className="label font-bold">Provide A Meet Link</label>
                  <input
                    className="input border-2 input-bordered w-full shadow-inner"
                    name="supportLink"
                    placeholder="Enter Your Meet Link"
                    {...register("supportLink", {
                      required: true,
                    })}
                  />
                  {errors.supportLink && (
                    <span className="text-red-500">
                      Support Link is required.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="divider before:bg-secondary after:bg-secondary">
              <button
                onClick={() => {
                  setOpenSupportModal(null);
                }}
                className=" btn btn-sm  btn-secondary  text-white font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" btn btn-sm  btn-secondary  text-white font-bold"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SupportModal;
