import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import  'swiper/swiper-bundle.css';
import {Navigation,Pagination,Scrollbar,A11y ,Autoplay} from 'swiper/modules';
const Hero = ({ swiperFood = "" }) => {
  // Dummy swiperFood array with sample data
  const dummySwiperFood = [
    {
      title: ["Everything","is better","with food"],
      description: " Crispy on the outside and tender on the inside, the french fries were the epitome of perfection.",
      image: "/burger.png",
      alt: "Delicious Burger",
    },
    {
      title: ["sandwitch","Tomato","with extra chizze"],
      description: "Fresh sushi rolls with assorted and vegetables",
      image: "/sandwitch.png",
      alt: "Scrumptious Sushi",
      myclass:"  w-3/4 pt-14"
    },
    {
      title: ["Live pizza","with","Dominozz"],
      description: "Thin crust pizza loaded with cheese and pepperoni",
      image: "/pizza.png",
      alt: "Tasty Pizza",
      myclass:"  pr-32 pt-5 "
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Scrollbar, A11y,Autoplay]}
        spaceBetween={50}
        color={"yellow-5"}
        pagination={{ clickable: true }}
       
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 3000 }}
        className="min-h-full"
      >
        {dummySwiperFood.map((food, i) => (
          <SwiperSlide key={i}>
            <section className="hero mx-2 flex bg-gradient-to-r from-fuchsia-50 to-richblack-700 rounded-lg">
              <div className="py-8 ml-48 w-[48%]">
                <h1 className="text-6xl font-bold leading-tight underline">
                  {food?.title?.map((t)=><>{t}<br></br></>)}
                </h1>
                <br />
                <p className="mt-4 text-sn text-gray-800 font-medium">
                 {food.description}
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

              <div className="relative mt  bg-blend-screen">
                <img    className={`relative ${food.myclass}`}
                  src={food.image}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
