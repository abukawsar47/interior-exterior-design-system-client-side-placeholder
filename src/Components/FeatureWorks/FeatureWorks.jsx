import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import FeatureSection from "../FeatureSection/FeatureSection";
import LoadingData from "../Loading/LoadingData";

const FeatureWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  } = useQuery({ queryKey: ["storeAllFeatures", 1], queryFn: getData });

  if (isLoading) {
    return <LoadingData />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto px-4 xl:my-32 lg:my-16 md:my-8 my-4">
      <div className="">
        <div className="text-center  lg:mb-16 md:mb-8 mb-4 block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            All Feature Work
          </h2>
        </div>
        <div className="  bg-base-100 lg:mb-16 md:mb-8 mb-4">
          <div className="text-center p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   lg:gap-10 md:gap-6 gap-4">
              {features?.data?.map((feature) => (
                <FeatureSection key={feature?._id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureWorks;
