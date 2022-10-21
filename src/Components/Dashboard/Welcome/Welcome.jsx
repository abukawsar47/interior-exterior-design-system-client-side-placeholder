import React from "react";
import welcome from "../../../assets/banner/welcome.png";
const Welcome = () => {
  return (
    <>
      <h2 className="md:text-4xl text-center font-bold text-secondary uppercase mt-4">
        Welcome to your Dashboard
      </h2>
      <img className="w-fit mx-auto" src={welcome} alt="welcome Banner" />
    </>
  );
};

export default Welcome;
