import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="py-16 lg:py-24 mx-4 lg:mx-44 relative">
      <div className="relative glass-card rounded-3xl overflow-hidden mesh-gradient">
        {/* Accent borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paprika/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-floral-300/20 to-transparent" />

        <div className="text-center py-16 px-6 relative z-10">
          {/* Decorative bg glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-paprika/5 rounded-full blur-[80px] pointer-events-none" />

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-floral relative">
            See the magic.{" "}
            <span className="bg-gradient-to-r from-paprika to-floral-300 bg-clip-text text-transparent text-glow">
              Try now
            </span>
          </h2>
          <p className="text-dust-500 mt-3 text-sm max-w-md mx-auto">
            Upload your image and watch the background disappear instantly. It's free — no signup required to try.
          </p>

          <div className="mt-8">
            <input
              onChange={(e) => removeBg(e.target.files[0])}
              type="file"
              accept="image/*"
              id="upload2"
              hidden
            />
            <label
              className="inline-flex gap-3 items-center px-10 py-4 rounded-full cursor-pointer bg-gradient-to-r from-paprika to-paprika-600 text-floral font-medium text-sm hover:scale-105 transition-all duration-500 glow-paprika-strong"
              htmlFor="upload2"
            >
              <img width={20} src={assets.upload_btn_icon} alt="" className="brightness-0 invert" />
              Upload your image
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
