import React, { useEffect } from "react";
import FeaturesSection from "../../Components/FeaturedSection/FeaturesSection";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import News from "../../Components/News/News";
import Reviews from "../../Components/Reviews/Reviews";
import Service from "../../Components/Service/Service";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div>
        <HomeBanner />
        <FeaturesSection />
        <Service />
        <Reviews />
        <News />
        <GetInTouch />
      </div>
    </>
  );
};

export default Home;
