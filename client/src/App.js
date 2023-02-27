import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

/////PAGES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/CreateAccount";

/////COMPONENTS
import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {(location?.pathname === "/home" || location?.pathname === "/") && (
        <MainHeader />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
