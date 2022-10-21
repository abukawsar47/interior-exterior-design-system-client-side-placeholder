import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

import { useToast } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";

const CheckoutForm = ({ order }) => {
  const location = useLocation();
  const toast = useToast();

  const [clientSecret, setClientSecret] = useState("");
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardErr, setCardErr] = useState("");
  const [orderSuccess, setOrderSuccess] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [transId, setTransId] = useState("");
  const { orderTotal, buyerName, buyerEmail, _id } = order;
  useEffect(() => {
    fetch(
      "https://tekno-interior-server.onrender.com/api/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ orderTotal }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          return;
        }
      });
  }, [navigate, order, orderTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardErr(error?.message || "");
    setOrderSuccess("");
    setPaymentProcessing(true);
    // confirm order payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: `${buyerName}`,
            email: `${buyerEmail}`,
          },
        },
      });
    if (intentError) {
      setCardErr(intentError?.message);
      setPaymentProcessing(false);
    } else {
      setCardErr("");
      setTransId(paymentIntent.id);

      setOrderSuccess("Congrats your payment is successful.");

      // update payment info on the database

      const payment = {
        orderId: _id,
        transactionId: paymentIntent.id,
      };
      try {
        const paymentUpdate = await axios.patch(
          `https://tekno-interior-server.onrender.com/api/order/${_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            payment,
          }
        );

        if (paymentUpdate.status === 201) {
          toast({
            title: "Payment Success.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          setPaymentProcessing(false);
        } else {
          toast({
            title: "Something Went Wrong!",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          setPaymentProcessing(false);
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Something Went Wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setPaymentProcessing(false);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",

                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || orderSuccess}
          className="btn md:btn-md btn-sm  mt-8 h-16 w-full rounded-sm bg-secondary tracking-wide font-semibold text-white"
        >
          Pay
        </button>
      </form>
      <p className="text-warning">{cardErr}</p>
      {paymentProcessing && (
        <p className="text-center text-blue-500">Loading....</p>
      )}
      {orderSuccess && <p className="text-green-500">{orderSuccess}</p>}
      {transId && (
        <p className="text-green-500">
          Your transaction Id:{" "}
          <span className="text-orange-400">{transId}</span>
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
