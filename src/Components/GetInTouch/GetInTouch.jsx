import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const GetInTouch = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmit = async (data) => {
    const contactData = {
      name: data?.name,
      email: data?.email,
      subject: data?.subject,
      phone: data?.number,
      message: data?.message,
    };

    try {
      const newContact = await axios.post(
        "https://tekno-interior-server.onrender.com/api/contact",
        contactData
      );

      if (newContact.status === 201) {
        toast({
          title: "Thanks. We receive your message.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Something Went Wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    reset();
  };

  return (
    <div className="container mx-auto px-4 xl:mb-32 lg:mb-16 md:mb-8 mb-4">
      <div className="">
        <div className="text-center  lg:lg:mb-16 md:mb-8 mb-4 my-5 block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Get In Touch
          </h2>
        </div>
        <div className="lg:p-10 p-5  w-full bg-base-100 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
            <div className="flex lg:flex-row flex-col  gap-5">
              <div className="form-control lg:mt-3 w-full">
                <label className="label">
                  <span className="label-text font-bold text-lg">
                    Name <span className="text-secondary">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                  {...register("name", {
                    required: true,
                  })}
                />

                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control lg:mt-3 w-full">
                <label className="label">
                  <span className="label-text font-bold text-lg">
                    Email <span className="text-secondary">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  required
                  {...register("email", {
                    required: true,
                  })}
                />

                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col  gap-5">
              <div className="form-control lg:mt-3 w-full">
                <label className="label">
                  <span className="label-text font-bold text-lg">
                    Subject <span className="text-secondary">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                  required
                  {...register("subject", {
                    required: true,
                  })}
                />

                {errors.subject && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control lg:mt-3 w-full">
                <label className="label">
                  <span className="label-text font-bold text-lg">
                    Phone <span className="text-secondary">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  name="number"
                  placeholder="Your Contact Number"
                  className="input input-bordered w-full"
                  required
                  min="0"
                  {...register("number", {
                    required: true,
                  })}
                />

                {errors.number && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="form-control mt-3 w-full">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Message<span className="text-secondary">*</span>
                </span>
              </label>
              <textarea
                type="text"
                name="message"
                placeholder="Message..."
                className="input input-bordered w-full lg:h-[180px] h-[90px] pt-3"
                required
                {...register("message", {
                  required: true,
                })}
              />

              {errors.message && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control  w-full">
              <div className="lg:mt-10 mt-6 text-center">
                <button
                  type="submit"
                  className="btn md:btn-md btn-sm  btn-secondary text-white font-bold px-10"
                >
                  GET IN TOUCH
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
