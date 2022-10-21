import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesPath from "./Components/Routers/Routes";
import Footer from "./Components/Shared/Footer/Footer";
import Navbar from "./Components/Shared/Navbar/Navbar";
import MessengerCustomerChat from "react-messenger-customer-chat";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[85vh]">
        <RoutesPath />
      </div>
      <MessengerCustomerChat pageId="107258445421492" appId="379749327336153" />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
