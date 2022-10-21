import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingData from "../Loading/LoadingData";

const ServiceDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [services, setServices] = useState({});

  useEffect(() => {
    const url = `https://tekno-interior-server.onrender.com/api/service/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [id]);

  if (!services.img) {
    return <LoadingData />;
  }

  return (
    <div className="container mx-auto px-4 ">
      <div className="lg:py-16 md:py-8 py-4">
        <img className="w-fit mx-auto" src={services?.img} alt="" />
      </div>
      <div className="lg:pb-16 md:pb-8 pb-4">
        <div className="divider before:bg-secondary after:bg-secondary">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="lg:text-4xl text-xl font-bold text-secondary ">
              {services?.category}
            </h2>
          </div>
        </div>
        <div className="lg:py-16 md:py-8 py-4 text-center">
          <p>{services?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
