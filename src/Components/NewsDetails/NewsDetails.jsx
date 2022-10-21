import React, { useEffect, useState } from "react";
import "./NewsDetails.css";
import { useParams } from "react-router-dom";
import LoadingData from "../Loading/LoadingData";

const NewsDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [news, setNews] = useState({});

  useEffect(() => {
    const url = `https://tekno-interior-server.onrender.com/api/news/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, [id]);

  if (!news.img) {
    return <LoadingData />;
  }

  return (
    <div className="container mx-auto px-4 ">
      <div className="lg:py-16 md:py-8 py-4">
        <img className="w-fit mx-auto" src={news?.img} alt="" />
      </div>
      <div className="lg:pb-16 md:pb-8 pb-4">
        <div className="divider before:bg-secondary after:bg-secondary">
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="lg:text-4xl text-xl font-bold text-secondary ">
              {news?.title}
            </h2>
            <strong className="flex items-center gap-2 md:text-2xl">
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
              {news?.date}
            </strong>
          </div>
        </div>
        <div className="lg:py-16 md:py-8 py-4 text-center">
          <p>{news?.news}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
