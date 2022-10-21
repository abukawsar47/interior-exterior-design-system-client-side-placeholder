import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useState } from "react";
import { useForm } from "react-hook-form";
const UpdateProfileModal = ({
  openUpdateModal,
  setOpenUpdateModal,
  refetch,
}) => {
  const { email } = openUpdateModal;
  const toast = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors },
    // reset,
  } = useForm();

  const onFormSubmit = async (data, e) => {
    e.preventDefault();
    const updateInfo = {
      occupation: data?.occupation,
      phoneNumber: data?.number,
      postCode: data?.post,
      city: data?.city,
      billingAddress: data?.billing,
    };
    console.log(updateInfo);

    try {
      const newUpdatedInfo = await axios.patch(
        `https://tekno-interior-server.onrender.com/api/user/${email}`,
        updateInfo
      );
      if (newUpdatedInfo.status === 201) {
        toast({
          title: "Successfully Updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        refetch();
        setOpenUpdateModal(null);
      } else {
        toast({
          title: "Something Went Wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setOpenUpdateModal(null);
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setOpenUpdateModal(null);
    }
    setOpenUpdateModal(null);
    // reset();
  };

  return (
    <>
      <input type="checkbox" id="update-profile" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="divider before:bg-secondary after:bg-secondary">
            <h2 className=" uppercase md:text-4xl text-xl text-secondary font-bold">
              Update Info
            </h2>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
            <div className="flex-1  flex flex-col">
              <div className="flex flex-col lg:flex-row lg:first-letter gap-4">
                <div className="md:flex-1 mt-2 mb:mt-0 ">
                  <label className="label font-bold">Your Profession</label>
                  <input
                    className="input border-2 input-bordered w-full shadow-inner"
                    name="occupation"
                    placeholder="Enter Your Profession"
                    {...register("occupation", {
                      required: true,
                    })}
                  />
                  {errors.occupation && (
                    <span className="text-red-500">
                      Profession is required.
                    </span>
                  )}
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 ">
                  <label className="label font-bold">Phone Number</label>
                  <input
                    className="input border-2 input-bordered w-full shadow-inner"
                    placeholder="Your contact number"
                    name="number"
                    type="tel"
                    minLength="11"
                    {...register("number", {
                      required: true,
                    })}
                  />
                  {errors.number && (
                    <span className="text-red-500">
                      Contact number is required
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-8 ">
                <div className="flex flex-col lg:flex-row lg:gap-4">
                  <div className="md:flex-1 mt-2 mb:mt-0 ">
                    <label className="label font-bold">Postal Code</label>
                    <input
                      className="input border-2 input-bordered w-full shadow-inner"
                      name="post"
                      placeholder="Your postal code"
                      type="text"
                      {...register("post", {
                        required: true,
                      })}
                    />
                    {errors.post && (
                      <span className="text-red-500">
                        Postal Code is required
                      </span>
                    )}
                  </div>
                  <div className="md:flex-1 mt-2 mb:mt-0 ">
                    <label className="label font-bold">City</label>
                    <input
                      className="input border-2 input-bordered w-full shadow-inner"
                      name="city"
                      placeholder="Your City"
                      type="text"
                      {...register("city", {
                        required: true,
                      })}
                    />
                    {errors.city && (
                      <span className="text-red-500">City is required</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="md:flex-1 mt-2 mb:mt-0 ">
                    <label className="label font-bold">Billing Address</label>
                    <input
                      className="input border-2 input-bordered w-full shadow-inner"
                      name="billing"
                      placeholder="Your address line"
                      type="text"
                      {...register("billing", {
                        required: true,
                      })}
                    />
                    {errors.billing && (
                      <span className="text-red-500">
                        Billing Address is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="divider before:bg-secondary after:bg-secondary">
              <button
                onClick={() => setOpenUpdateModal(null)}
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

export default UpdateProfileModal;
