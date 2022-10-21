import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../Firebase/Firebase.init";
import RequireAuth from "../RequireAuth/RequireAuth";

const BookingModal = ({ booking, setBooking }) => {
  const [user] = useAuthState(auth);
  const [buyerAddress, setBuyerAddress] = useState("");
  const [phoneNubmer, setPhoneNumber] = useState("");
  const toast = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmit = async (data, e) => {
    e.preventDefault();
    const bookingInfo = {
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      productName: booking?.category,
      productImg: booking?.img,
      orderTotal: booking?.price,
      billingInfo: data?.address,
      buyerPhone: data?.number,
    };

    try {
      const newBooking = await axios.post(
        "https://tekno-interior-server.onrender.com/api/order",
        bookingInfo
      );

      if (newBooking.status === 201) {
        toast({
          title: "Successfully Booked.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setBooking(null);
      } else {
        toast({
          title: "Something Went Wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setBooking(null);
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setBooking(null);
    }
    // reset();
  };

  return (
    <>
      <RequireAuth>
        <input type="checkbox" id="booking-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <div className="divider before:bg-secondary after:bg-secondary">
              <h2 className=" uppercase md:text-4xl text-xl text-secondary font-bold">
                Booking Info
              </h2>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
              <div className="flex-1  flex flex-col">
                <div className="mb-8 ">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="md:flex-1 mt-2 mb:mt-0 ">
                      <label className="label font-bold">Your Name</label>
                      <input
                        className="input border-2 input-bordered w-full shadow-inner"
                        name="name"
                        value={user?.displayName}
                        readOnly
                        {...register("name", {
                          required: true,
                        })}
                      />
                      {errors.name && (
                        <span className="text-red-500">Name is required</span>
                      )}
                    </div>
                    <div className="md:flex-1 mt-2 mb:mt-0 ">
                      <label className="label font-bold">Your Email</label>
                      <input
                        className="input border-2 input-bordered w-full shadow-inner"
                        name="name"
                        value={user?.email}
                        readOnly
                        {...register("email", {
                          required: true,
                        })}
                      />
                      {errors.email && (
                        <span className="text-red-500">Email is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="md:flex-1 mt-2 mb:mt-0 ">
                      <label className="label font-bold">Product Name</label>
                      <input
                        className="input border-2 input-bordered w-full shadow-inner"
                        name="name"
                        value={booking?.category}
                        readOnly
                        {...register("category", {
                          required: true,
                        })}
                      />
                      {errors.category && (
                        <span className="text-red-500">
                          Category is required
                        </span>
                      )}
                    </div>
                    <div className="md:flex-1 mt-2 mb:mt-0 ">
                      <label className="label font-bold">Product Price</label>
                      <input
                        className="input border-2 input-bordered w-full shadow-inner"
                        value={booking?.price}
                        name="price"
                        readOnly
                        {...register("price", {
                          required: true,
                        })}
                      />
                      {errors.price && (
                        <span className="text-red-500">
                          Minimum 10 character Review is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="md:flex-1 mt-2 mb:mt-0 ">
                      <label className="label font-bold">Your Address</label>
                      <input
                        className="input border-2 input-bordered w-full shadow-inner"
                        name="name"
                        placeholder="Your Address"
                        {...register("address", {
                          required: true,
                        })}
                      />
                      {errors.address && (
                        <span className="text-red-500">
                          Address is required
                        </span>
                      )}
                    </div>
                    <div className="md:flex-1 mt-2 mb:mt-0 ">
                      <label className="label font-bold">Your Number</label>
                      <input
                        className="input border-2 input-bordered w-full shadow-inner"
                        placeholder="Your contact number"
                        name="number"
                        type="number"
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
                </div>
              </div>
              <div className="divider before:bg-secondary after:bg-secondary">
                <label
                  htmlFor="booking-modal"
                  className=" btn btn-sm  btn-secondary  text-white font-bold"
                >
                  Cancel
                </label>
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
      </RequireAuth>
    </>
  );
};

export default BookingModal;
