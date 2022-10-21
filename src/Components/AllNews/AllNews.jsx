import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingData from "../Loading/LoadingData";
import { BiFilter } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import FilterNews from "./FilterNews";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
const AllNews = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const navigateToDetail = (id) => {
    navigate(`/news/${id}`);
  };

  const getData = async () => {
    return await axios.get(
      "https://tekno-interior-server.onrender.com/api/news"
    );
  };

  const {
    data: news,
    isLoading,
    // refetch,
    error,
  } = useQuery({ queryKey: ["storeAllNews", 1], queryFn: getData });
  if (isLoading) {
    return <LoadingData />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto px-4 xl:my-32 lg:my-16 md:my-8 my-4">
      <div className="text-center flex items-center justify-center  lg:mb-16 md:mb-8 mb-4 ">
        <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
          Company News
        </h2>
        <div
          onClick={() => onOpen()}
          className="flex cursor-pointer items-center justify-center"
        >
          <BiFilter className="ml-4 text-secondary w-6 h-6" />
          <h3 className="text-lg">Filter</h3>
        </div>
      </div>
      <div className="bg-base-100">
        <div className="text-center p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:gap-10 md:gap-6 gap-4">
            {news?.data?.map((report) => (
              <div
                className="card bg-base-100 shadow-2xl overflow-hidden rounded-none p-0 m-0"
                key={report._id}
              >
                <figure className="w-full">
                  <img
                    src={report?.img}
                    alt="feature"
                    className="rounded-none w-full"
                  />
                </figure>

                <div className="card-body items-center p-4">
                  <h2 className="card-title font-bold">{report.title}</h2>
                  <strong className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {report.date}
                  </strong>
                  <p>{report.news.slice(0, 112)}...</p>
                  <button
                    className="btn   md:btn-md btn-sm  btn-secondary "
                    onClick={() => navigateToDetail(report?._id)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Filter News</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FilterNews />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllNews;
