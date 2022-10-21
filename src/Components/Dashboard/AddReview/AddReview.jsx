import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../../Firebase/Firebase.init";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const toast = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmit = async (data) => {
    const review = {
      img: user?.photoURL,
      name: data?.name,
      review: data?.review,
      rate: data?.rate,
      occupation: data?.occupation,
    };

    try {
      const newReview = await axios.post(
        "https://tekno-interior-server.onrender.com/api/review",
        review
      );

      if (newReview.status === 201) {
        toast({
          title: "Thanks For Your Review.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
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

    reset();
  };

  return (
    <>
      <div className="min-h-fit md:m-16 m-4">
        <div className="flex-1  flex flex-col">
          <section className=" p-6 rounded-2xl  shadow">
            <div className="divider before:bg-secondary after:bg-secondary">
              <h2 className=" uppercase md:text-4xl text-secondary font-bold">
                Add A New Review
              </h2>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
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
                      <span className="text-red-500">
                        Minimum 10 character Review is required
                      </span>
                    )}
                  </div>
                  <div className="md:flex-1 mt-2 mb:mt-0 ">
                    <label className="label font-bold">Your Profession</label>
                    <input
                      className="input border-2 input-bordered w-full shadow-inner"
                      placeholder="Enter your profession"
                      name="occupation"
                      {...register("occupation", {
                        required: true,
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        Minimum 10 character Review is required
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-end">
                    <label className="label font-bold">Review Rating</label>

                    <select
                      name="rate"
                      {...register("rate", {
                        required: true,
                      })}
                      className="select  border-2 input-bordered w-full "
                    >
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </div>
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 ">
                  <label className="label font-bold">New Review</label>
                  <textarea
                    className="input  border-2 input-bordered w-full shadow-inner lg:h-[180px] h-[90px] pt-3"
                    placeholder="Enter your review here..."
                    rows="6"
                    name="review"
                    {...register("review", {
                      minLength: 10,
                      required: true,
                    })}
                  ></textarea>
                  {errors.review && (
                    <span className="text-red-500">
                      Minimum 10 character review is required
                    </span>
                  )}
                </div>
              </div>

              <div className="divider before:bg-secondary after:bg-secondary">
                <button
                  type="submit"
                  className="btn  md:btn-md btn-sm  btn-secondary md:px-10 text-white font-bold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddReview;
