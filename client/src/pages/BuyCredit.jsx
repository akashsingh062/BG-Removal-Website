import React from "react";
import { assets, plans } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const initPay = async (order) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Credits Payment",
        description: "Credits Payment",
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
          const token = await getToken();
          try {
            const { data } = await axios.post(
              backendUrl + "/api/user/verify-razor",
              response,
              { headers: token }
            );
            if (data.success) {
              loadCreditsData();
              navigate("/");
              toast.success("Credit Added");
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10 mx-4 lg:mx-44 animate-fade-in-up">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 glass-card px-5 py-2 rounded-full mb-6 gradient-border">
        <div className="w-2 h-2 rounded-full bg-paprika" />
        <span className="text-xs font-medium text-dust-500 tracking-wider uppercase">Our Plans</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-floral mb-4">
        Choose the plan that's{" "}
        <span className="bg-gradient-to-r from-paprika to-floral-300 bg-clip-text text-transparent">
          right for you
        </span>
      </h1>
      <p className="text-dust-500 text-sm max-w-md mx-auto mb-10 sm:mb-14">
        Simple, transparent pricing. Pick a plan and start removing backgrounds today.
      </p>

      {/* Plan cards */}
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => {
          const isPopular = item.id === "Advanced";
          return (
            <div
              key={index}
              className={`relative glass-card rounded-2xl py-10 px-8 text-floral hover:scale-[1.03] transition-all duration-500 min-w-[280px] max-w-[320px] flex-1 overflow-hidden ${
                isPopular ? "glow-paprika-strong" : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Accent top line */}
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${
                  isPopular
                    ? "from-transparent via-paprika to-transparent"
                    : "from-transparent via-charcoal-600/50 to-transparent"
                }`}
              />

              {/* Popular badge */}
              {isPopular && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-paprika to-paprika-600 text-floral text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                isPopular ? "bg-paprika/15 border border-paprika/30" : "bg-charcoal-400/30 border border-charcoal-400/30"
              }`}>
                <img
                  className="w-6 brightness-0 invert opacity-80"
                  src={assets.logo_icon}
                  alt=""
                />
              </div>

              {/* Plan info */}
              <p className="text-lg font-bold text-floral">{item.id}</p>
              <p className="text-sm text-dust-500 mt-1">{item.desc}</p>

              {/* Price */}
              <p className="mt-6">
                <span className={`text-4xl font-bold ${
                  isPopular
                    ? "bg-gradient-to-r from-paprika to-floral-300 bg-clip-text text-transparent"
                    : "text-floral"
                }`}>
                  ${item.price}
                </span>
                <span className="text-dust-500 text-sm ml-1">
                  / {item.credits} credits
                </span>
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-dust-600">
                  <svg className="w-4 h-4 text-paprika flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item.credits} background removals
                </li>
                <li className="flex items-center gap-2 text-sm text-dust-600">
                  <svg className="w-4 h-4 text-paprika flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  High-res PNG download
                </li>
                <li className="flex items-center gap-2 text-sm text-dust-600">
                  <svg className="w-4 h-4 text-paprika flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  No watermarks
                </li>
              </ul>

              {/* Purchase button */}
              <button
                onClick={() => paymentRazorpay(item.id)}
                className={`w-full mt-8 text-sm rounded-full py-3 min-w-52 cursor-pointer font-medium transition-all duration-500 hover:scale-105 ${
                  isPopular
                    ? "bg-gradient-to-r from-paprika to-paprika-600 text-floral glow-paprika"
                    : "bg-charcoal-400/40 text-floral hover:bg-charcoal-400/60 border border-charcoal-400/30"
                }`}
              >
                {isPopular ? "Get Started" : "Purchase"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyCredit;
