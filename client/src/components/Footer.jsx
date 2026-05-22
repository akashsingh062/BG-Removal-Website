import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative border-t border-charcoal-400/50 mt-8">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paprika/30 to-transparent" />

      <div className="mx-4 lg:mx-44 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <img
              className="w-36 brightness-0 invert opacity-80"
              src={assets.logo}
              alt="BG Removal"
            />
            <p className="text-sm text-dust-600 mt-2 max-w-xs">
              AI-powered background removal tool. Fast, accurate, and free.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-floral font-semibold text-xs uppercase tracking-wider mb-1">Product</p>
              <a href="#" className="text-dust-500 hover:text-paprika transition-colors duration-300">Features</a>
              <a href="/buy" className="text-dust-500 hover:text-paprika transition-colors duration-300">Pricing</a>
              <a href="#" className="text-dust-500 hover:text-paprika transition-colors duration-300">API</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-floral font-semibold text-xs uppercase tracking-wider mb-1">Company</p>
              <a href="#" className="text-dust-500 hover:text-paprika transition-colors duration-300">About</a>
              <a href="#" className="text-dust-500 hover:text-paprika transition-colors duration-300">Blog</a>
              <a href="#" className="text-dust-500 hover:text-paprika transition-colors duration-300">Contact</a>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-floral font-semibold text-xs uppercase tracking-wider">Follow us</p>
            <div className="flex gap-2">
              <a href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-paprika/10 transition-all duration-300 group">
                <img className="w-5 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" src={assets.facebook_icon} alt="Facebook" />
              </a>
              <a href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-paprika/10 transition-all duration-300 group">
                <img className="w-5 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" src={assets.twitter_icon} alt="Twitter" />
              </a>
              <a href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-paprika/10 transition-all duration-300 group">
                <img className="w-5 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" src={assets.google_plus_icon} alt="Google Plus" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-charcoal-400/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-dust-600">
            © {new Date().getFullYear()} BG Removal. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-dust-600">
            <a href="#" className="hover:text-paprika transition-colors">Privacy</a>
            <a href="#" className="hover:text-paprika transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
