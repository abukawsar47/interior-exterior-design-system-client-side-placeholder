import React from "react";
import notFound from "../../../assets/banner/404-page.jpg";
const NotFound = () => {
  return (
    <div>
      <div className="container mx-auto px-4 xl:my-32 lg:my-16 md:my-8 my-4">
        <div className="relative">
          <div className="banner-wrapper">
            <img className="" src={notFound} alt="Home Banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
