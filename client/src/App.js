import React from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";

/////PAGES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/CreateAccount";
import Items from "./pages/Items";

/////COMPONENTS
import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import Login from "./pages/Login";
import SecondaryHeader from "./components/SecondaryHeader";

const App = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {location?.pathname === "/home" || location?.pathname === "/" ? (
        <MainHeader />
      ) : location.pathname !== "/register" &&
        location.pathname !== "/login" ? (
        <SecondaryHeader />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:category" element={<Items />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
