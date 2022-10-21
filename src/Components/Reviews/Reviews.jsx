import React, { useEffect, useState } from "react";
import "./Reviews.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingData from "../Loading/LoadingData";

const Reviews = () => {
  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/review"
    );
  };
  const {
    data: allReviews,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["storeAllReviews", 1], queryFn: getData });

  if (isLoading) {
    return (
      <div className="md:my-8 my-4">
        <div className="text-center block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Happy Customers
          </h2>
        </div>
        <LoadingData />
      </div>
    );
  }
  if (error) {
    return <p>Something Went Wrong....</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div className="container mx-auto px-4 xl:my-32 lg:my-16 md:my-8 my-4">
      <div className="">
        <div className="text-center block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Happy Customers
          </h2>
        </div>
        <div className="lg:p-16 md:p-8 p-4">
          {allReviews?.data && (
            <Slider {...settings}>
              {allReviews?.data?.slice(0, 6)?.map((review) => (
                <div
                  className="card bg-base-100 overflow-hidden rounded-xl relative"
                  key={review._id}
                >
                  <div className="items-center xl:p-20 lg:p-16 md:p-8 p-4 border rounded-xl">
                    <div className="review-slider ">
                      <figure className="gap-5">
                        <div className="avatar">
                          <div className="w-20 rounded-full ring ring-secondary ring-offset-base-100 shadow-xl">
                            <img
                              src={
                                review?.img
                                  ? review?.img
                                  : "https://foxdogconsultants.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                              }
                              alt="user"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className=" font-bold py-1 text-xl text-secondary">
                            {review.name}
                          </h2>
                          <strong className=" ">{review.occupation}</strong>
                        </div>
                      </figure>

                      <p className="text-center mt-8 lg:mx-8 mx-4">
                        {review.review}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
