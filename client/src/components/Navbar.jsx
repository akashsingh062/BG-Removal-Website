import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <nav className="glass-nav sticky top-0 z-50 animate-fade-in">
      <div className="flex items-center justify-between mx-4 py-3.5 lg:mx-44">
        <Link to="/" className="group">
          <img
            className="w-32 sm:w-44 brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            src={assets.logo}
            alt="BG Removal"
          />
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 glass-card px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-500 group"
            >
              <img className="w-5" src={assets.credit_icon} alt="" />
              <p className="text-xs sm:text-sm font-medium text-dust-600 group-hover:text-floral transition-colors">
                Credits: <span className="text-paprika font-semibold">{credit}</span>
              </p>
            </button>
            <p className="text-dust-500 max-sm:hidden text-sm">
              Hi, <span className="text-floral-400">{user.fullName}</span>
            </p>
            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => openSignIn({})}
            className="bg-gradient-to-r from-paprika to-paprika-600 text-floral flex items-center gap-3 px-5 py-2.5 sm:px-8 sm:py-3 text-sm font-medium rounded-full cursor-pointer hover:scale-105 transition-all duration-500 glow-paprika hover:glow-paprika-strong"
          >
            Get started
            <img className="w-3 sm:w-4 brightness-0 invert" src={assets.arrow_icon} alt="" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
