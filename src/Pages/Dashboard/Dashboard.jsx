import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";
import useAdmin from "../../hooks/useAdmin";
import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [user] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user?.email);

  return (
    <div className="drawer drawer-mobile ">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>

        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>

        <ul className=" flex flex-col gap-5 shadow-md  bg-[rgb(0,7,61)] p-4 overflow-y-auto w-80 font-semibold  text-white">
          {adminLoading && (
            <p className="mt-10 text-xl font-semibold text-blue-500">
              Loading...
            </p>
          )}
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink
              to="/dashboard/my-profile"
              end
              className={({ isActive }) =>
                `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                  isActive ? " bg-primary" : undefined
                }`
              }
            >
              My Profile
            </NavLink>
          </li>

          {!admin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/add-review"
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                >
                  Add Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-booking"
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                >
                  My Booking
                </NavLink>
              </li>
            </>
          )}

          {admin && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                  to="/dashboard/users"
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                  to="/dashboard/add-feature-work"
                >
                  Add Feature Work
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                  to="/dashboard/manage-feature-works"
                >
                  Manage Feature Works
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                  to="/dashboard/manage-booking"
                >
                  Manage Booking
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                  to="/dashboard/add-news"
                >
                  Add News
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-news"
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                >
                  Manage News
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                  to="/dashboard/add-service"
                >
                  Add Service
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-service"
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                >
                  Manage Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/report"
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                >
                  Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-live-support"
                  className={({ isActive }) =>
                    `p-2  text-white rounded hover:bg-gray-200 hover:text-gray-500 ${
                      isActive ? " bg-primary" : undefined
                    }`
                  }
                >
                  Live Support
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
