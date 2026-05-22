import React from "react";
import { assets } from "../assets/assets";

const steps = [
  {
    icon: assets.upload_icon,
    title: "Upload Image",
    desc: "Select any image from your device. We support JPG, PNG, and WebP formats up to 10MB.",
    num: "01",
  },
  {
    icon: assets.remove_bg_icon,
    title: "AI Removes Background",
    desc: "Our AI model analyzes your image and precisely separates the subject from the background in seconds.",
    num: "02",
  },
  {
    icon: assets.download_icon,
    title: "Download Result",
    desc: "Get your clean, transparent PNG instantly. Ready for social media, e-commerce, or design projects.",
    num: "03",
  },
];

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 lg:py-32 relative">
      {/* Section title */}
      <div className="text-center animate-fade-in-up">
        <p className="text-paprika font-medium text-sm tracking-widest uppercase mb-3">
          How It Works
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-floral">
          Remove backgrounds in{" "}
          <span className="bg-gradient-to-r from-paprika to-floral-300 bg-clip-text text-transparent">
            three simple steps
          </span>
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 xl:mt-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`glass-card rounded-2xl p-8 pb-10 relative overflow-hidden group hover:scale-[1.03] transition-all duration-500 animate-fade-in-up delay-${(index + 1) * 200}`}
          >
            {/* Large step number watermark */}
            <span className="absolute -top-2 -right-2 text-[80px] font-black text-floral/[0.03] leading-none select-none pointer-events-none">
              {step.num}
            </span>

            {/* Glowing top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paprika/40 to-transparent" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-paprika/10 border border-paprika/20 flex items-center justify-center mb-5 group-hover:bg-paprika/20 transition-colors duration-500">
              <img className="w-7 brightness-0 invert opacity-80" src={step.icon} alt="" />
            </div>

            {/* Content */}
            <p className="text-lg font-semibold text-floral mb-2">{step.title}</p>
            <p className="text-sm text-dust-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
