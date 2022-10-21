import React from "react";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../Firebase/Firebase.init";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  if (loading) {
    return;
  }

  if (!user) {
    return <Navigate to="/authentication/user" state={{ from: location }} replace />;
  }

  if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
    return (
      <>
        <div className="min-h-[80vh]">
          <div className="text-center flex justify-center items-center h-[70vh] ">
            <div>
              <h3 className="text-2xl font-semibold">
                Your Email is not verified!!
              </h3>
              <h5 className="text-2xl mb-5 font-semibold">
                Please Verify your email address
              </h5>
              <span className="text-xl font-semibold text-gray-600">
                Clik here{" "}
                <button
                  className="text-blue-500"
                  onClick={async () => {
                    await sendEmailVerification();
                    if (sending) {
                      toast("We Sent a email");
                    }
                    if (error) {
                      toast("maybe try many time or Something went wrong");
                    }
                  }}
                >
                  Send a verification email again
                </button>
              </span>
            </div>
            <ToastContainer />
          </div>
        </div>
      </>
    );
  }

  return children;
};

export default RequireAuth;
