import React, { useEffect, useState } from "react";
import "./FeatureWorkDetails.css";
import { useParams } from "react-router-dom";
import BookingModal from "./BookingModal";
import LoadingData from "../Loading/LoadingData";

const FeatureWorkDetails = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  const [feature, setFeature] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const url = `https://tekno-interior-server.onrender.com/api/featured-item/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFeature(data));
  }, [id]);

  if (!feature.category || !feature?.price) {
    return <LoadingData />;
  }
  return (
    <div className="container mx-auto px-4">
      <div className=" lg:py-16 md:py-8 py-4">
        <img className="w-fit mx-auto" src={feature?.img} alt="" />
      </div>
      <div className=" lg:pb-16 md:pb-8 pb-4">
        <div className="divider before:bg-secondary after:bg-secondary">
          <div className="flex flex-col justify-center items-center lg:gap-4 md:gap-2 gap-1">
            <h2 className="lg:text-4xl text-2xl font-bold text-secondary ">
              {feature?.category}
            </h2>
            <strong className="md:text-2xl text-lg">
              Remuneration: ${feature?.price ? feature?.price : "Negotiable"}
            </strong>
          </div>
        </div>

        <div className="md:py-8 py-4 ">
          <p>{feature.description}</p>
        </div>
        <div className="divider before:bg-secondary after:bg-secondary">
          <label
            htmlFor="booking-modal"
            onClick={() => {
              setBooking(feature);
            }}
            className="btn md:btn-md btn-sm  modal-button btn-secondary md:w-1/3 px-10  text-white font-bold"
          >
            Book Now
          </label>
        </div>
      </div>
      {booking && <BookingModal booking={booking} setBooking={setBooking} />}
    </div>
  );
};

export default FeatureWorkDetails;
