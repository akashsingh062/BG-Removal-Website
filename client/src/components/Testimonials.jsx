import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="py-16 lg:py-24 mx-4 lg:mx-44 relative">
      {/* Section title */}
      <div className="text-center animate-fade-in-up">
        <p className="text-paprika font-medium text-sm tracking-widest uppercase mb-3">
          Testimonials
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-floral">
          Loved by{" "}
          <span className="bg-gradient-to-r from-paprika to-floral-300 bg-clip-text text-transparent">
            thousands
          </span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12 lg:mt-16">
        {testimonialsData.map((item, index) => (
          <div
            className="glass-card rounded-2xl p-7 relative overflow-hidden group hover:scale-[1.03] transition-all duration-500 animate-fade-in-up"
            key={index}
            style={{ animationDelay: `${(index + 1) * 0.15}s` }}
          >
            {/* Accent top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paprika/30 to-transparent" />

            {/* Quote mark */}
            <span className="text-5xl font-serif bg-gradient-to-br from-paprika to-floral-300 bg-clip-text text-transparent leading-none select-none">
              "
            </span>

            <p className="text-sm text-dust-600 leading-relaxed mt-1">{item.text}</p>

            {/* Star rating */}
            <div className="flex gap-0.5 mt-4 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-floral-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-paprika to-floral-300 rounded-full blur-sm opacity-40" />
                <img
                  className="w-10 h-10 rounded-full relative border-2 border-charcoal-400 object-cover"
                  src={item.image}
                  alt={item.author}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-floral">{item.author}</p>
                <p className="text-xs text-dust-500">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
