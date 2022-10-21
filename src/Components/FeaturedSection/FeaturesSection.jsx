import React from "react";
import FeatureSection from "../FeatureSection/FeatureSection";
import "./FeaturesSection.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingData from "../Loading/LoadingData";

const FeaturesSection = () => {
  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/featured-item"
    );
  };
  const {
    data: features,
    isLoading,
    // refetch,
    error,
  } = useQuery({ queryKey: ["storeHomeFeatures", 1], queryFn: getData });

  if (isLoading) {
    return (
      <>
        <div className="text-center  lg:mb-16 md:mb-8 mb-4 block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Featured Works
          </h2>
        </div>
        <LoadingData />
      </>
    );
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto px-4 xl:my-32 lg:my-16 md:my-8 my-4">
      <div className="">
        <div className="text-center  lg:mb-16 md:mb-8 mb-4 block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Featured Works
          </h2>
        </div>
        <div className="  bg-base-100 lg:mb-16 md:mb-8 mb-4">
          <div className="text-center p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-6 gap-4">
              {features?.data?.slice(0, 6).map((feature) => (
                <FeatureSection key={feature?._id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:mt-16 md:mt-8 mt-4 text-center ">
          <Link
            to="/feature-works"
            className="btn md:btn-md btn-sm  btn-secondary md:w-1/3 w-full  text-white font-bold"
          >
            View All Works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
