import React from "react";
import "./News.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingData from "../Loading/LoadingData";

const News = () => {
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
    return (
      <div className="xl:my-32 lg:my-16 md:my-8 my-4">
        <div className="text-center  lg:mb-16 md:mb-8 mb-4 block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Company News
          </h2>
          <LoadingData />
        </div>
      </div>
    );
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="container mx-auto px-4 xl:my-32 lg:my-16 md:my-8 my-4">
      <div className="">
        <div className="text-center  lg:mb-16 md:mb-8 mb-4 block">
          <h2 className="text-secondary lg:text-5xl text-2xl font-bold mb-2 uppercase">
            Company News
          </h2>
        </div>
        <div className="  bg-base-100 lg:mb-16 md:mb-8 mb-4">
          <div className="text-center p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:gap-10 md:gap-6 gap-4">
              {news?.data?.slice(0, 3).map((report) => (
                <div
                  className="card bg-base-100 shadow-2xl overflow-hidden rounded-[16px] p-0 m-0"
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
                      className="btn md:btn-md btn-sm  btn-secondary w-full "
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
        <div className="lg:mt-16 md:mt-8 mt-4 text-center">
          <Link
            to="/all-news"
            className="btn md:btn-md btn-sm  btn-secondary md:w-1/3 w-full  mx-auto  text-white font-bold"
          >
            View All News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
