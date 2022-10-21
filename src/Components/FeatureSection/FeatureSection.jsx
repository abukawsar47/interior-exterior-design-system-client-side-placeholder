import React from "react";
import "./FeatureSection.css";
import { useNavigate } from "react-router-dom";

const FeatureSection = ({ feature }) => {
  const navigate = useNavigate();

  const navigateToDetail = (id) => {
    navigate(`/featured-item/${id}`);
  };

  return (
    <div className="bg-base-100 shadow-2xl overflow-hidden rounded-[16px]">
      <figure className=" ">
        <img
          src={feature?.img}
          alt="feature"
          className="rounded-none min-h-[260px] mx-auto"
        />
      </figure>

      <div
        className="card-body items-center bg-secondary text-white p-4 cursor-pointer"
        onClick={() => navigateToDetail(feature?._id)}
      >
        <h2 className="card-title font-bold">{feature.category}</h2>
      </div>
    </div>
  );
};

export default FeatureSection;
