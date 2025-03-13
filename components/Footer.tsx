"use client";

import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { socialMedia } from "@/data"; // Import socialMedia from @/data
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      {/* Optimized Background Grid */}
      <div className="absolute inset-x-0 bottom-0 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="Footer Background Grid"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
          priority // Ensures faster loading for above-the-fold content
        />
      </div>

      <div className="flex flex-col items-center relative z-10">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:contact@jsmastery.pro">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
            aria-label="Contact me via email"
          />
        </a>
      </div>

      {/* Improved Layout & Social Icons */}
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center relative z-10">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Adrian Hajdin
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map(({ id, img, name }) => (
            <div
              key={id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              aria-label={`Visit my ${name || `social icon ${id}`}`} // Fallback to `social icon ${id}` if `name` is undefined
            >
              <Image
                src={img}
                alt={name || `social icon ${id}`} // Fallback to `social icon ${id}` if `name` is undefined
                width={20}
                height={20}
                quality={75} // Optimize image quality
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;