import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L2gn9GA0XpGKfvc6Q60V7zNUxJevymIcAnC28fKtUldEYOrJb4mlSncctiBdzp9b46Nubmo800rzozVOU3GAq5d009kNMSbhJ"
);

const Payment = () => {
  const { orderId } = useParams();

  const getData = async () => {
    return await axios.get(
      `https://tekno-interior-server.onrender.com/api/order/details/${orderId}`
    );
  };
  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["storeOrderDetails", 1], queryFn: getData });

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-xl text-blue-500">Loadig....</p>
    );
  }

  return (
    <>
      <div className="h-screen flex items-center">
        <div className="w-96 mx-auto  border border-gray-400 rounded-lg">
          <div className="w-full h-auto p-4 flex items-center border-b border-gray-400">
            <h1 className="w-full text-center text-sm font-semibold text-indigo-700">
              Pay for ${order?.data?.orderTotal}
            </h1>
          </div>
          <div className="w-full h-auto p-4">
            <div>
              <div className="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
                <span className="text-xs tracking-wide uppercase font-semibold">
                  Booking Name
                </span>
                <input
                  className="w-full h-8 focus:outline-none"
                  readOnly
                  value={order?.data?.productName}
                />
              </div>

              <div className="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
                <span className="text-xs tracking-wide uppercase font-semibold">
                  Buyer Name
                </span>
                <input
                  className="w-full h-8 focus:outline-none"
                  readOnly
                  value={order?.data?.buyerName}
                />
              </div>

              <div className=" mb-8 px-3 py-1  bg-white rounded-sm border border-gray-300 focus-within:border-gray-500">
                <div className="w-full focus-within:text-gray-900">
                  <span className="text-xs tracking-wide uppercase font-semibold">
                    Order Total
                  </span>
                  <input
                    className="w-full font-bold h-8 focus:outline-none"
                    readOnly
                    value={order?.data?.orderTotal}
                  />
                </div>
              </div>

              {order?.data && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm order={order?.data} />
                </Elements>
              )}
            </div>
          </div>
        </div>
        <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100"></div>
      </div>
    </>
  );
};

export default Payment;
