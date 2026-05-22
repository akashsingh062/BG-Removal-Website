import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const { image, resultImage, setResultImage } = useContext(AppContext);

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh] animate-fade-in-up">
      <div className="glass-card rounded-2xl px-8 py-8 gradient-border">
        {/* Title */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-paprika/10 border border-paprika/20 flex items-center justify-center">
            <img className="w-5 brightness-0 invert opacity-80" src={assets.image_icon} alt="" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-floral">Your Result</h1>
            <p className="text-sm text-dust-500">Compare original and processed images</p>
          </div>
        </div>

        {/* Image container */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/* Left side — Original */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img className="w-4 brightness-0 invert opacity-50" src={assets.upload_icon} alt="" />
              <p className="font-semibold text-sm text-dust-600 uppercase tracking-wider">Original</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-charcoal-400/50">
              <img
                className="w-full"
                src={image ? URL.createObjectURL(image) : null}
                alt="Original image"
              />
            </div>
          </div>

          {/* Right side — Background Removed */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <img className="w-4 brightness-0 invert opacity-70" src={assets.remove_bg_icon} alt="" />
              <p className="font-semibold text-sm text-paprika uppercase tracking-wider">
                Background Removed
              </p>
            </div>
            <div className="rounded-xl border border-charcoal-400/50 h-full relative checkerboard overflow-hidden">
              <img className="w-full relative z-[1]" src={resultImage ? resultImage : null} alt="Result" />
              {!resultImage && image && (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 z-[2]">
                  <div className="border-4 border-paprika rounded-full h-12 w-12 border-t-transparent animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        {resultImage && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-8">
            <button
              onClick={() => setResultImage(false)}
              className="inline-flex items-center gap-2 px-8 py-2.5 text-paprika text-sm border border-paprika/40 rounded-full hover:bg-paprika/10 hover:scale-105 transition-all duration-500 font-medium"
            >
              <img className="w-4" src={assets.upload_icon} alt="" style={{ filter: 'invert(44%) sepia(89%) saturate(1500%) hue-rotate(3deg) brightness(98%) contrast(90%)' }} />
              Try another image
            </button>
            <a
              href={resultImage}
              download
              className="inline-flex items-center gap-2 px-8 py-2.5 text-floral text-sm bg-gradient-to-r from-paprika to-paprika-600 rounded-full hover:scale-105 transition-all duration-500 glow-paprika font-medium"
            >
              <img className="w-4 brightness-0 invert" src={assets.download_icon} alt="" />
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
