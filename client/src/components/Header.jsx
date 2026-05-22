import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="relative px-4 mt-10 lg:px-44 sm:mt-20 pb-10">
      {/* Decorative orb */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-paprika/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 relative z-10">
        {/* Left Side */}
        <div className="animate-fade-in-up">

          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-floral leading-tight tracking-tight">
            Remove the <br className="max-md:hidden" />
            <span className="bg-gradient-to-r from-paprika via-paprika-600 to-floral-300 bg-clip-text text-transparent">
              background
            </span>{" "}
            from <br className="max-md:hidden" />
            images for free.
          </h1>

          <p className="my-6 text-[15px] text-dust-500 leading-relaxed max-w-lg">
            Effortlessly remove backgrounds from any image with our
            AI-powered tool. Get stunning, transparent results in seconds —
            no design skills needed.
          </p>

          <div>
            <input
              onChange={(e) => removeBg(e.target.files[0])}
              type="file"
              accept="image/*"
              id="upload1"
              hidden
            />
            <label
              className="inline-flex gap-3 items-center px-8 py-4 rounded-full cursor-pointer bg-gradient-to-r from-paprika to-paprika-600 hover:from-paprika-400 hover:to-paprika text-floral font-medium text-sm hover:scale-105 transition-all duration-500 glow-paprika hover:glow-paprika-strong"
              htmlFor="upload1"
            >
              <img width={20} src={assets.upload_btn_icon} alt="" className="brightness-0 invert" />
              Upload your image
            </label>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-carbon-500" src={assets.profile_img_1} alt="" />
                <img className="w-7 h-7 rounded-full border-2 border-carbon-500" src={assets.profile_img_2} alt="" />
              </div>
              <p className="text-xs text-dust-600">1K+ users</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-floral-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <p className="text-xs text-dust-600 ml-1">4.9/5</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full max-w-md animate-fade-in-up delay-200 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-paprika/20 to-transparent rounded-3xl blur-2xl scale-110" />
            <div className="relative glass-card rounded-3xl p-3 gradient-border">
              <img className="rounded-2xl" src={assets.header_img} alt="Background removal preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
