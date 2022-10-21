import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useLocation } from "react-router-dom";
import auth from "../../../Firebase/Firebase.init";
import { useQuery } from "react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
const Navbar = () => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/live-support"
    );
  };
  const {
    data: support,
    isLoading,
    refetch,
    error,
  } = useQuery({ queryKey: ["storeUserSupport", 1], queryFn: getData });
  const logout = () => {
    signOut(auth);
  };

  const menuItems = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
              isActive ? " bg-[#021431]" : undefined
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
              isActive ? " bg-[#021431]" : undefined
            }`
          }
          to="/feature-works"
        >
          Feature Works
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
              isActive ? " bg-[#021431]" : undefined
            }`
          }
          to="/all-news"
        >
          Blogs
        </NavLink>
      </li>

      <li>
        <button onClick={onOpen}>Live Support</button>
      </li>

      {user && (
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn  btn-ghost  btn-circle avatar">
            <div className="w-10 rounded-full  ring-white ring-2">
              <img
                src={
                  user?.photoURL
                    ? user?.photoURL
                    : "https://foxdogconsultants.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                }
                alt="user img"
              />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-secondary rounded-box w-52"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
                isActive ? " bg-[#021431]" : undefined
              }`
            }
            to="/authentication/user"
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="sticky top-0 bg-secondary text-white font-bold  z-40 drop-shadow-xl ">
      <div className="container navbar md:min-h-[96px] justify-between mx-auto px-4">
        {pathname?.includes("dashboard") && (
          <div className="lg:navbar-start lg:hidden">
            <label
              tabIndex="1"
              htmlFor="dashboard-sidebar"
              className="btn md:btn-md btn-sm  btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
        )}
        <div className="lg:navbar-start">
          <NavLink
            to="/"
            className="btn  btn-ghost normal-case text-2xl font-bold"
          >
            Interior
          </NavLink>
        </div>
        {/* mobile menu */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex="0"
            className="btn md:btn-md btn-sm  btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-secondary rounded-box w-52"
          >
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
                      isActive ? " bg-[#021431]" : undefined
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
                      isActive ? " bg-[#021431]" : undefined
                    }`
                  }
                  to="/feature-works"
                >
                  Feature Works
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
                      isActive ? " bg-[#021431]" : undefined
                    }`
                  }
                  to="/all-news"
                >
                  Blogs
                </NavLink>
              </li>
              {user && (
                <div
                  tabIndex="0"
                  className="collapse collapse-plus  bg-secondary text-white rounded-box w-full"
                >
                  <label className="btn  btn-ghost btn-circle avatar">
                    <div className="w-6 rounded-full  ring-white ring-2">
                      <img
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : "https://foxdogconsultants.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                        }
                        alt="user img"
                      />
                    </div>
                  </label>

                  {/* mobile menu collapse content*/}
                  <div className="collapse-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </div>
                </div>
              )}
              {!user && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `py-2 px-4  text-white rounded hover:bg-gray-200 hover:text-gray-500  ${
                        isActive ? " bg-[#021431]" : undefined
                      }`
                    }
                    to="/authentication/user"
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex min-w-fit">
          <ul className="menu menu-horizontal  p-0 gap-2">{menuItems}</ul>
        </div>
      </div>

      {/* support modal  */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader mt={10}>
            Live Support{" "}
            {support?.data?.isOpen ? "Available." : "Not Available!"}
          </ModalHeader>
          <ModalBody pb={6}>
            {support?.data?.isOpen ? (
              <h1>Join now for Live Support with our customer care team.</h1>
            ) : (
              <h1>
                Please try to contact on live chat. Our customer care team will
                give you instant reply.
              </h1>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            {support?.data?.isOpen && (
              <Button colorScheme="blue">
                <a href={support?.data?.link} target="__blank">
                  Join
                </a>
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Navbar;
