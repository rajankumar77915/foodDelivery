import React from "react";
import Image from "next/image";
import { FaHandPointRight } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      <section className="hero ml-8 flex">
        <div className="py-8 ml-48">
          <h1 className="text-6xl font-bold leading-tight">
            Everything
            <br /> is better
            <br /> with food
          </h1>
          <br />
          <p className="mt-4 text-sn text-gray-800 font-medium">
            Crispy on the outside and tender on the inside, the french fries
            were the epitome of perfection.
          </p>

          <br />
          <div className="flex gap-4">
            {/* <FaHandPointRight /> */}
            <button className="bg-red-500 text-white px-8 py-2 rounded-full">
              Order now
            </button>
            <button className="border-0">Learn more</button>
          </div>
        </div>

        <div className="relative mt">
          <img
            src={"./burger.png"}
            layout={"fill"}
            objectFit={"contain"}
            // width={00}
            alt="food1"
          /> 

         {/* <Image
            src={"/food1.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt="food1"
          /> */}
        </div> 
      </section>
    </>
  );
};

export default Hero;
