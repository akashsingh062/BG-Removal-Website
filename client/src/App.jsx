import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen bg-carbon-500 text-floral relative overflow-x-hidden">
      {/* Ambient background orbs */}
      <div className="ambient-orb w-[500px] h-[500px] bg-paprika top-0 -left-64 fixed" />
      <div className="ambient-orb w-[400px] h-[400px] bg-floral-300 bottom-0 -right-48 fixed" style={{ animationDelay: '2s' }} />

      <ToastContainer
        position="bottom-center"
        autoClose={3200}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        limit={2}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
