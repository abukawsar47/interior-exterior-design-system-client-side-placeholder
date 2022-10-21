import React from "react";
import { Route, Routes } from "react-router-dom";
import Authentication from "../../Pages/Authentication/Authentication";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Home from "../../Pages/HomePage/Home";
import FeatureWorkDetails from "../FeatureWorkDetails/FeatureWorkDetails";
import NewsDetails from "../NewsDetails/NewsDetails";
import RequireAuth from "../RequireAuth/RequireAuth";
import MyProfile from "../Dashboard/Profile/MyProfile";
import NotFound from "../Shared/NotFound/NotFound";
import paths from "./routerPath";
import AddReview from "../Dashboard/AddReview/AddReview";
import Welcome from "../Dashboard/Welcome/Welcome";
import Users from "../Dashboard/Users/Users";
import AddFeatureWork from "../Dashboard/AddFeatureWork/AddFeatureWork";
import ManageFeatureWorks from "../Dashboard/ManageFeatureWorks/ManageFeatureWorks";
import ManageBooking from "../Dashboard/ManageBooking/ManageBooking";
import FeatureWorks from "../FeatureWorks/FeatureWorks";
import AllNews from "../AllNews/AllNews";
import AddNews from "../Dashboard/AddNews/AddNews";
import MyBookings from "../Dashboard/MyBooking/MyBookings";
import ManageNews from "../Dashboard/ManageNews/ManageNews";
import LiveSupportAdmin from "../Dashboard/LiveSupport/LiveSupportAdmin";
import Payment from "../payment/Payment";
import Search from "../Search/Search";
import Report from "../Dashboard/Report/Report";
import ServiceDetails from "../Service/ServiceDetails";
import AddService from "../Dashboard/AddService/AddService";
import ManageService from "../Dashboard/ManageService/ManageService";

const RoutesPath = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.search} element={<Search />} />
      <Route path={paths.authentication} element={<Authentication />} />
      <Route path={paths.featureWorkDetails} element={<FeatureWorkDetails />} />
      <Route path={paths.featureWorks} element={<FeatureWorks />} />
      <Route path={paths.serviceDetails} element={<ServiceDetails />} />
      <Route path={paths.newsDetails} element={<NewsDetails />} />
      <Route path={paths.allNews} element={<AllNews />} />
      <Route
        path={paths.dashboard}
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route
          index
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        />
        <Route
          path="my-profile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />

        <Route
          path="add-review"
          element={
            <RequireAuth>
              <AddReview />
            </RequireAuth>
          }
        />
        <Route
          path="my-booking"
          element={
            <RequireAuth>
              <MyBookings />
            </RequireAuth>
          }
        />
        <Route
          path="users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />

        <Route
          path="add-feature-work"
          element={
            <RequireAuth>
              <AddFeatureWork />
            </RequireAuth>
          }
        />
        <Route
          path="manage-feature-works"
          element={
            <RequireAuth>
              <ManageFeatureWorks />
            </RequireAuth>
          }
        />
        <Route
          path="manage-booking"
          element={
            <RequireAuth>
              <ManageBooking />
            </RequireAuth>
          }
        />
        <Route
          path="add-news"
          element={
            <RequireAuth>
              <AddNews />
            </RequireAuth>
          }
        />

        <Route
          path="manage-news"
          element={
            <RequireAuth>
              <ManageNews />
            </RequireAuth>
          }
        />
        <Route
          path="add-service"
          element={
            <RequireAuth>
              <AddService />
            </RequireAuth>
          }
        />

        <Route
          path="manage-service"
          element={
            <RequireAuth>
              <ManageService />
            </RequireAuth>
          }
        />
        <Route
          path="admin-live-support"
          element={
            <RequireAuth>
              <LiveSupportAdmin />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/payment/:orderId"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/report"
          element={
            <RequireAuth>
              <Report />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesPath;
