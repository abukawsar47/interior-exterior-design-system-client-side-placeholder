import React, { useState } from "react";
import "./HomeBanner.css";
import homeBanner from "../../assets/banner/homeBanner.png";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const onSearch = () => {
    if (!searchValue) {
      return;
    } else {
      navigate(`/search/${searchValue}`);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 xl:mb-32 xl:mt-16 lg:my-16 md:my-8 my-4">
        <div className="relative">
          <div className="search-input">
            <label className="label lg:text-5xl md:text-2xl text-normal text-center uppercase font-bold text-secondary mx-auto">
              Modern Contemporary House Idea
            </label>
            <div className="input-group md:mt-4 mt-2">
              <input
                type="text"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                placeholder="Search…"
                className="input lg:input-lg md:input-md input-sm input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => {
                  onSearch();
                }}
                className="btn lg:btn-lg md:btn-md btn-sm  btn-natural "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="banner-wrapper">
            <img
              className="opacity-50 rounded-[16px]"
              src={homeBanner}
              alt="Home Banner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
