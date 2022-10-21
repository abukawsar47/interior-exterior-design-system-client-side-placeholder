import React, { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import LoadingData from "../Loading/LoadingData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FilterNews = () => {
  const navigate = useNavigate();

  const navigateToDetail = (id) => {
    navigate(`/news/${id}`);
  };
  const [date, setDate] = useState(new Date());
  const formattedDate = date && format(date, "PP");
  const url = `https://tekno-interior-server.onrender.com/api/news/filter/${formattedDate}`;

  const getData = async () => {
    return await axios.get(url);
  };

  const {
    data: news,
    isLoading,
    // refetch,
    error,
  } = useQuery({
    queryKey: ["filterNewsByDate", 1, formattedDate],
    queryFn: getData,
  });
  if (isLoading) {
    return <LoadingData />;
  }
  if (error) {
    console.log(error);
  }
  const errorText = news?.data?.error;

  return (
    <div>
      <div className="flex justify-center items-center ">
        <DayPicker mode="single" selected={date} onSelect={setDate} />
      </div>

      <h1 className="text-xl text-center font-semibold">
        {formattedDate} News List
      </h1>
      {isLoading && <LoadingData />}
      {error ? (
        <p className="mt-5">Something Went Wrong Please try again</p>
      ) : (
        ""
      )}

      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:gap-10 md:gap-6 gap-4">
        {!news?.data?.error &&
          news?.data?.map((report) => (
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

      {errorText && (
        <p className="text-center mt-5 text-2xl">
          Your Selected Data Have No News
        </p>
      )}

      <div />
    </div>
  );
};

export default FilterNews;
