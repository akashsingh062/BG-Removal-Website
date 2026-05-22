import React, { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handelSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="pb-10 md:py-20 mx-4 lg:mx-44 relative">
      {/* Section title */}
      <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
        <p className="text-paprika font-medium text-sm tracking-widest uppercase mb-3">
          See The Difference
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-floral">
          High quality{" "}
          <span className="bg-gradient-to-r from-paprika to-floral-300 bg-clip-text text-transparent">
            & accurate
          </span>{" "}
          results
        </h2>
      </div>

      {/* Slider container */}
      <div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-2xl glass-card p-2 gradient-border">
        <div className="relative rounded-xl overflow-hidden">
          {/* bg-image */}
          <img
            className="absolute top-0 left-0 w-full h-full"
            src={assets.image_w_bg}
            style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
            alt="With background"
          />
          {/* foreground image */}
          <img
            src={assets.image_wo_bg}
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            alt="Without background"
          />
          {/* slider */}
          <input
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={handelSliderChange}
          />

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-floral/40 z-[5] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          />

          {/* Labels */}
          <div className="absolute bottom-4 left-4 glass-card px-3 py-1 rounded-full z-[5] pointer-events-none">
            <span className="text-xs font-medium text-floral/80">Before</span>
          </div>
          <div className="absolute bottom-4 right-4 glass-card px-3 py-1 rounded-full z-[5] pointer-events-none">
            <span className="text-xs font-medium text-paprika">After</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BgSlider;
